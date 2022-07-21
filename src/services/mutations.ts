import axios from 'axios'
import { API_KEY, BASE_URL } from 'utils/constants'
import { EditArticleFormType } from 'utils/types'
import { AddCommentMutation, CreateArticleMutation } from './types'

export const createArticle = (
  data: CreateArticleMutation,
  accessToken: string | null
) => {
  return axios.post(`${BASE_URL}/articles`, data, {
    headers: {
      'X-API-KEY': API_KEY,
      'Authorization': accessToken as string
    }
  })
}

export const uploadImage = (
  image: FormData,
  accessToken: string | null
) => {
  return axios.post(`${BASE_URL}/images`, image, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-API-KEY': API_KEY,
      'Authorization': accessToken as string
    }
  })
}

export const editArticle = (
  id: string,
  data: EditArticleFormType,
  accessToken: string | null
) => {
  return axios.patch(`${BASE_URL}/articles/${id}`, data, {
    headers: {
      'X-API-KEY': API_KEY,
      'Authorization': accessToken as string
    }
  })
}

export const deleteArticle = (id: string, accessToken: string | null) => {
  return axios.delete(`${BASE_URL}/articles/${id}`,
    {
      headers: {
        'X-API-KEY': API_KEY,
        'Authorization': accessToken as string
      }
    }
  )
}

export const addComment = (data: AddCommentMutation, accessToken: string | null) => {
  return axios.post(`${BASE_URL}/comments`, data, {
    headers: {
      'X-API-KEY': API_KEY,
      'Authorization': accessToken as string
    }
  })
}

export const voteComment = (commentId: string, direction: 'up' | 'down') => {
  return axios.post(`${BASE_URL}/comments/${commentId}/vote/${direction}`, null,
    {
      headers: {
        'X-API-KEY': API_KEY
      }
    }
  )
}

export const voteDownComment = (commentId: string, accessToken: string | null) => {
  return axios.post(`${BASE_URL}/comments/${commentId}/vote/down`, null,
    {
      headers: {
        'X-API-KEY': API_KEY
      }
    }
  )
} 
