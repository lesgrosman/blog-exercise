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
