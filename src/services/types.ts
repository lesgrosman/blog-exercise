export type CreateArticleMutation = {
  title: string
  perex: string
  content: string
  imageId?: string
}

export type EditArticleMutation = {
  title: string
  perex: string
  content: string
  imageId?: string
}

export type AddCommentMutation = {
  content: string
  author: string
  articleId: string
}

export type ArticleItemType = {
  articleId: string
  createdAt: string
  imageId: string
  lastUpdatedAt: string
  perex: string
  title: string
}

export type PaginationType = {
  total: number
  limit: number
  offset: number
}

export type ArticlesQueryDataType = {
  items: ArticleItemType[]
  pagination: PaginationType
}

export type CommentType = {
  commentId: string
  articledId: string
  author:  string
  content: string
  createdAt: string
  score: number
}

export type ArticleDetailType = {
  articleId: string
  createdAt: string
  imageId: string
  lastUpdatedAt: string
  perex: string
  title: string
  content: string
  comments: CommentType[]
}
