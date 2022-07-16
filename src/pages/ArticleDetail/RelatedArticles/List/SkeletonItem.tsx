import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

const SkeletonItem = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="80%"
        height={20}
        sx={{ mb: 2 }}
      />

      <Skeleton
        animation="wave"
        variant="text"
        width="90%"
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="75%"
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="80%"
      />
    </Box>
  )
}

export default SkeletonItem
