import axios from 'axios'
import { API_KEY, BASE_URL } from 'utils/constants'

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
