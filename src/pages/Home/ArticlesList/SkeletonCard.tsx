import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import CardLayout from './ArticleCard/CardLayout'

const SkeletonCard = () => {

  const image = (
    <Skeleton
      variant="rectangular"
      height="100%"
      width="100%"
      animation="wave"
    />
  )

  const skeletonTitle = (
    <Skeleton
      animation="wave"
      variant="text"
      width="65%"
    />
  )

  const skeletonDate = (
    <Skeleton
      animation="wave"
      variant="text"
      width="35%"
    />
  )

  const skeletonPerex = (
    <Box display="flex" flexDirection="column">
      <Skeleton
        animation="wave"
        variant="text"
        width="80%"
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="90%"
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="70%"
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="90%"
      />
    </Box>
  )

  const skeletonButton = (
    <Skeleton
      variant="rectangular"
      height={25}
      width={100}
      animation="wave"
    />
  )

  return (
    <CardLayout
      title={skeletonTitle}
      perex={skeletonPerex}
      image={image}
      date={skeletonDate}
      linkButton={skeletonButton}
    />
  )
}

export default SkeletonCard
