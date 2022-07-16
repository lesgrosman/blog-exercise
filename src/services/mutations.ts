import axios from 'axios'
import { API_KEY, BASE_URL } from 'utils/constants'
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

export const voteUpComment = (commentId: string, accessToken: string | null) => {
  return axios.post(`${BASE_URL}/comments/${commentId}/vote/up`,
    {
      headers: {
        'X-API-KEY': API_KEY,
        'Authorization': accessToken as string
      }
    }
  )
}

export const voteDownComment = (commentId: string, accessToken: string | null) => {
  return axios.post(`${BASE_URL}/comments/${commentId}/vote/down`,
    {
      headers: {
        'X-API-KEY': API_KEY,
        'Authorization': accessToken as string
      }
    }
  )
} 
