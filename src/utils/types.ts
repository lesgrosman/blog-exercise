export type CreateArticleFormType = {
  title: string
  perex: string
  content: string
  image?: File[] | null
}

export type EditArticleFormType = {
  title: string
  perex: string
  content: string
  image?: File[] | null
}

export type LoginForm = {
  email: string
  password: string
}

export type Order = 'asc' | 'desc'
