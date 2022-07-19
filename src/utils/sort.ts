import { ArticleItemType, CommentType } from 'services/types'
import { Order } from './types'

export const sortByDate = (array: ArticleItemType[]) => {
  return array.sort((a: ArticleItemType, b: ArticleItemType) => (Date.parse(b.createdAt) - Date.parse(a.createdAt)))
}

export const sortByVotes = (array: CommentType[]) => {
  return array.sort((a: CommentType, b: CommentType) => ( b.score - a.score))
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
