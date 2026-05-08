import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { env } from '../shared/configuration/env.configuration.js'
import { CustomError } from './custom.error.js'
import { ErrorCode } from '../../../shared/src/models/error-code.model.js'

export function errorHandlerMiddleware() {
  return (
    error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    console.error('[ErrorHandlerMiddleware] Error captured: ', error)

    if (error instanceof CustomError) {
      return response.status(error.code).json({ error: error.value })
    }

    if (error instanceof ZodError) {
      return response.status(400).json({ error: error.issues })
    }

    const err = error as any
    const full_information = {
      message: err?.message,
      stack: err?.stack,
      cause: err?.cause,
      name: err?.name
    }

    console.error("[ErrorHandlerMiddleware] Error: ", full_information)

    return response.status(500).json({
      error: ErrorCode.UNEXPECTED_ERROR,
      ...(env.showFullErrors && {
        debug: full_information
      })
    })
  }
}
