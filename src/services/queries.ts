import axios from 'axios'
import { API_KEY, BASE_URL } from 'utils/constants'

export const fetchArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/articles`, {
    headers: {
      'X-API-KEY': API_KEY
    }
  })

  return data
}

export const fetchArticleDetail = async (id: string) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`, {
    headers: {
      'X-API-KEY': API_KEY
    }
  })

  return data
}
