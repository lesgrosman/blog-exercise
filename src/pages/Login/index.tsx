import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { useAuthContext } from 'context/auth'
import { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLogin } from 'utils/hooks/useLogin'
import * as z from 'zod'

export const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center'
  },
  paper: {
    padding: '32px 32px',
    boxShadow:'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    '& .MuiTypography-root': {
      marginBottom: 48
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 48
  }
}))

const schema = z.object({
  email: z.string().email({ message: 'Please enter correct email' }),
  password: z.string().min(1, { message: 'Required' })
})

const Login = () => {
  const classes = useStyles()
  const [ login ] = useLogin()
  const navigate = useNavigate()

  const { accessToken } = useAuthContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    resolver: zodResolver(schema)
  })

  const handleFormSubmit = (data: FieldValues) => {
    if (isValid) {
      login(data.email, data.password)
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6}>
        <Box className={classes.paper}>
          <Typography variant="h4">Log In</Typography>
          <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form}>
            <TextField
              label="Email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message as unknown as String}
            />
            <TextField
              label="Password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message as unknown as String}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Log in
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>

  )

}

export default Login
