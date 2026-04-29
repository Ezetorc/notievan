import type { CreateArticleDtoType } from "../../../../../shared/src/dtos/in/create-article.dto"

export type CreateArticleForm = Omit<CreateArticleDtoType, "image"> & {
    imageFile?: File
    imageUrl?: string
}