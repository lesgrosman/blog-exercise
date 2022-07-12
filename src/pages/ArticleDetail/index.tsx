import { useParams } from 'react-router-dom'

const ArticleDetail = () => {
  const { articleId } = useParams()

  return (
    <div>Article Detail {articleId}</div>
  )
}

export default ArticleDetail
