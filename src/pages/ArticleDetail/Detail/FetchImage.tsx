import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
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

const FetchImage = ({
  article
}: Props) => {
  const classes = useStyles()
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    fetch(`${BASE_URL}/images/${article.imageId}`, {
      method: 'GET',
      headers: { 'X-API-KEY': API_KEY }
    }).then((response) => {
      response.blob().then(myBlob => {
        const objectUrl = URL.createObjectURL(myBlob)
        setImageUrl(objectUrl)
      })
    })
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

export default FetchImage
