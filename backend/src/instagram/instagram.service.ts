import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { InternalServerError } from '../errors/internal-server.error.js'
import type { Token } from '../tokens/token.model.js'
import { TokensService } from '../tokens/tokens.service.js'
import { env } from '../shared/configuration/env.configuration.js'

export class InstagramService {
  static readonly ACCESS_TOKEN_NAME: string = 'INSTAGRAM_ACCESS_TOKEN'

  private static async getAccessToken(): Promise<Token> {
    return await TokensService.getByName(InstagramService.ACCESS_TOKEN_NAME)
  }

  private static async request<T>({
    endpoint,
    method = 'POST',
    body,
    query,
    baseUrl = InstagramService.accountBaseUrl
  }: {
    endpoint: string
    method?: 'GET' | 'POST'
    body?: Record<string, unknown>
    query?: Record<string, unknown>
    baseUrl?: string
  }): Promise<T> {
    const url = new URL(`${baseUrl}${endpoint}`)
    const token = await InstagramService.getAccessToken()

    url.searchParams.set('access_token', token.value)

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.set(key, String(value))
      }
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined
    })

    const text = await response.text()

    let data: any

    try {
      data = JSON.parse(text)
    } catch {
      throw new InternalServerError(ErrorCode.INSTAGRAM_ERROR)
    }

    if (!response.ok) {
      console.error('[Instagram] Error:', {
        status: response.status,
        statusText: response.statusText,
        data
      })

      throw new InternalServerError(ErrorCode.INSTAGRAM_ERROR)
    }

    return data as T
  }

  private static async createMedia(params: {
    imageUrl: string
    caption: string
  }): Promise<{
    id: string
  }> {
    return await InstagramService.request<{ id: string }>({
      endpoint: '/media',
      method: 'POST',
      body: {
        image_url: params.imageUrl,
        caption: params.caption
      }
    })
  }

  private static async publishMedia(creationId: string): Promise<{
    id: string
  }> {
    return await InstagramService.request<{
      id: string
    }>({
      endpoint: '/media_publish',
      method: 'POST',
      body: {
        creation_id: creationId
      }
    })
  }

  private static async waitUntilMediaReady(creationId: string): Promise<void> {
    const maxAttempts = 10
    const delayMs = 3000

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const response = await InstagramService.request<{
        status_code: string
      }>({
        baseUrl: 'https://graph.facebook.com/v25.0',
        endpoint: `/${creationId}`,
        method: 'GET',
        query: {
          fields: 'status_code'
        }
      })

      console.log('[Instagram] Media status:', response.status_code)

      if (response.status_code === 'FINISHED') {
        return
      }

      if (
        response.status_code === 'ERROR' ||
        response.status_code === 'EXPIRED'
      ) {
        throw new InternalServerError(ErrorCode.INSTAGRAM_ERROR)
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }

    throw new InternalServerError(ErrorCode.INSTAGRAM_ERROR)
  }

  static async createPost({
    imageUrl,
    caption
  }: {
    imageUrl: string
    caption: string
  }) {
    const media = await InstagramService.createMedia({
      imageUrl,
      caption
    })

    await InstagramService.waitUntilMediaReady(media.id)

    return await InstagramService.publishMedia(media.id)
  }

  private static get accountBaseUrl(): string {
    return `https://graph.facebook.com/v25.0/${env.instagram.businessAccountId}`
  }

  static async refreshAccessToken(): Promise<void> {
    const token = await InstagramService.getAccessToken()
    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token.value}`
    )

    if (!response.ok) {
      const error = await response.text()

      console.error('[Instagram] Refresh token error:', error)

      throw new InternalServerError(ErrorCode.INSTAGRAM_ERROR)
    }

    const data: {
      access_token: string
      expires_in: number
    } = await response.json()

    await TokensService.update(InstagramService.ACCESS_TOKEN_NAME, {
      value: data.access_token,
      expiresIn: new Date(data.expires_in),
      refreshedAt: new Date()
    })
  }
}
