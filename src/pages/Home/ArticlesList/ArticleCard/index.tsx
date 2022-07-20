import Button from '@mui/material/Button'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Image from 'components/Image'
import { useEffect, useState } from 'react'
import { ArticleItemType } from 'services/types'
import LocalizedDate from 'utils/components/LocalizedDate'
import { API_KEY, BASE_URL, ROUTES } from 'utils/constants'
import CardLayout from './CardLayout'

export const useStyles = makeStyles((theme: Theme) => ({
  image: {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
    height: '100%'
  },
  date: {
    color: theme.palette.text.disabled
  },
  button: {
    width: 'fit-content'
  }
}))

interface Props {
  article: ArticleItemType
}

const ArticleCard = ({ article }: Props) => {
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


  const image = (
    <Image
      src={imageUrl}
      className={classes.image}
      alt={article.title}
    />
  )

  const title = (
    <Typography variant="h5">
      {article.title}
    </Typography>
  )

  const date = (
    <Typography className={classes.date}>
      <LocalizedDate date={article.createdAt} isRaw />
    </Typography>
  )

  const perex = (
    <Typography variant="body1">
      {article.perex}
    </Typography>
  )

  const linkButton = (
    <Button
      variant="contained"
      color="primary"
      size="small"
      component="a"
      href={`${ROUTES.ARTICLES}/${article.articleId}`}
      className={classes.button}
    >
      Detail
    </Button>
  )

  return (
    <CardLayout
      title={title}
      perex={perex}
      image={image}
      date={date}
      linkButton={linkButton}
    />
  )
}

export default ArticleCard

