import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

const SkeletonDetail = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Skeleton
        variant="text"
        width="70%"
        height={45}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width="15%"
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="90%"
        height={400}
        animation="wave"
      />
      <Box display="flex" flexDirection="column" gap={1}>
        {[ ...Array(10) ].map((item, index) => (
          <Skeleton
            key={index + 1}
            variant="text"
            width="100%"
            animation="wave"
          />
        ))}
      </Box>
    </Box>
  )
}

export default SkeletonDetail
