import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

const SkeletonItem = () => {
  return (
    <Box display="flex" flexDirection="column" gap={3} pt={4}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="50%"
        height={20}
      />

      <Grid container>
        <Grid item xs={1}>
          <Skeleton
            animation="wave"
            variant="circular"
            width={44}
            height={44}
          />
        </Grid>
        <Grid item xs={11}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={30}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SkeletonItem
