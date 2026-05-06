import type { UpdateArticleDtoType } from '../../../../../shared/src/dtos/in/update-article.dto'

export type UpdateArticleForm = Omit<UpdateArticleDtoType, 'image'> & {
	imageFile?: File
	imageUrl?: string
}
