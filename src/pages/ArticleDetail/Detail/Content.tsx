import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import Image from 'components/Image'
import { useEffect, useState } from 'react'
import { ArticleDetailType } from 'services/types'
import LocalizedDate from 'utils/components/LocalizedDate'
import { API_KEY, BASE_URL } from 'utils/constants'

export const useStyles = makeStyles((theme: Theme) => ({
  date: {
    color: theme.palette.text.disabled
  },
  image: {
    objectFit: 'contain',
    objectPosition: 'center',
    width: '100%',
    height: '80%'
  }
}))

interface Props {
  article: ArticleDetailType
}

const Content = ({
  article
}: Props) => {
  const classes = useStyles()
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/images/${article.imageId}`, {
          headers: { 'X-API-KEY': API_KEY },
          responseType: 'blob'
        })
        const imageString = response.data
        const reader = new FileReader()
        reader.readAsDataURL(imageString)
        reader.onload = () => {
          const imageDataUrl = reader.result
          if (typeof imageDataUrl === 'string') {
            setImageUrl(imageDataUrl)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
    getImage()
  }, [article.imageId])
  

  
  return (
    <>
      <Typography variant="h4">
        {article.title}
      </Typography>

      <Typography variant="inherit" className={classes.date}>
        <LocalizedDate date={article.createdAt} isRaw />
      </Typography>

      <Image
        src={imageUrl}
        className={classes.image}
        alt={article.title}
      />
    </>
  )
}

export default Content
