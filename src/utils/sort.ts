import { ArticleItemType, CommentType } from 'services/types'

export const sortByDate = (array: ArticleItemType[]) => {
  return array.sort((a: ArticleItemType, b: ArticleItemType) => (Date.parse(b.createdAt) - Date.parse(a.createdAt)))
}

export const sortByVotes = (array: CommentType[]) => {
  return array.sort((a: CommentType, b: CommentType) => ( b.score - a.score))
}
