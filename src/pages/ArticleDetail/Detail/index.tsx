import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Image from 'components/Image'
import ReactMarkdown from 'react-markdown'
import { UseQueryResult, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { fetchArticleDetail } from 'services/queries'
import { ArticleDetailType } from 'services/types'
import LocalizedDate from 'utils/components/LocalizedDate'
import SkeletonDetail from './SkeletonDetail'

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

const Detail = () => {
  const classes = useStyles()
  const { articleId } = useParams()

  const id = articleId || ''

  const { data, isError, isLoading }: UseQueryResult<ArticleDetailType, Error> = 
    useQuery<ArticleDetailType, Error>(['article', id], () => fetchArticleDetail(id), {
      enabled: !!id
    })

  if (isLoading) {
    return (
      <SkeletonDetail />
    )
  }

  if (isError || !data) return <>Error :/</> 
  
  return (
    <Box display="flex" flexDirection="column" gap={2} paddingBottom={4}>
      <Typography variant="h4">
        {data.title}
      </Typography>

      <Typography variant="inherit" className={classes.date}>
        <LocalizedDate date={data.createdAt} isRaw />
      </Typography>

      <Image
        // eslint-disable-next-line max-len
        src="https://www.boredpanda.com/blog/wp-content/uploads/2016/10/worlds-most-beautiful-cats-47-57fc93324976e__700.jpg"
        className={classes.image}
        alt={data.title}
      />

      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {data.content}
      </ReactMarkdown>

    </Box>
  )
}

export default Detail
