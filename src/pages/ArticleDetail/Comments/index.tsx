import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { UseQueryResult, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchArticleDetail } from 'services/queries'
import { ArticleDetailType } from 'utils/types'
import Comment from './Comment'
import CommentForm from './CommentForm'
import SkeletonItem from './SkeletonItem'

const Comments = () => {
  const { articleId } = useParams()

  const id = articleId || ''

  const { data, isError, isLoading }: UseQueryResult<ArticleDetailType, Error> = 
    useQuery<ArticleDetailType, Error>(['articleComments', id], () => fetchArticleDetail(id), {
      enabled: !!id
    })

  if (isLoading) {
    return (
      <SkeletonItem />
    )
  }

  if (isError || !data) {
    return <>Error</>
  }
  return (
    <Box display="flex" flexDirection="column" gap={3} pt={4}>
      <Typography variant="h5">
        Comments {`(${data.comments.length})`}
      </Typography>

      <CommentForm />

      <Box display="flex" flexDirection="column" gap={3}>
        {data.comments.map(comment => (
          <Comment key={comment.commentId} comment={comment} />
        ))}
      </Box>
    </Box>
  )
}

export default Comments
