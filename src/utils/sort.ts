import { ArticleItemType } from './types'

export const sortByDate = (array: ArticleItemType[]) => {
  return array.sort((a: ArticleItemType, b: ArticleItemType) => (Date.parse(b.createdAt) - Date.parse(a.createdAt)))
}
