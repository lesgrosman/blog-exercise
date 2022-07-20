import { useEffect, useState } from 'react'
import { ArticleDetailType } from 'services/types'
import { API_KEY, BASE_URL } from 'utils/constants'
import EditForm from './EditForm'

interface Props {
  imageId: string
  data: ArticleDetailType
}

const FetchImage = ({
  imageId,
  data
}: Props) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    fetch(`${BASE_URL}/images/${imageId}`, {
      method: 'GET',
      headers: { 'X-API-KEY': API_KEY }
    }).then((response) => {
      response.blob().then(myBlob => {
        const objectUrl = URL.createObjectURL(myBlob)
        setImageUrl(objectUrl)
      })
    })
  }, [imageId])

  
  return (
    <EditForm
      initValues={data}
    />
  )
}

export default FetchImage
