import Box from '@mui/material/Box'
import ReactMarkdown from 'react-markdown'
import { UseQueryResult, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { fetchArticleDetail } from 'services/queries'
import { ArticleDetailType } from 'services/types'
import Content from './Content'
import SkeletonDetail from './SkeletonDetail'

const Detail = () => {
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
      
      <Content article={data} />

      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {data.content}
      </ReactMarkdown>

    </Box>
  )
}

export default Detail
