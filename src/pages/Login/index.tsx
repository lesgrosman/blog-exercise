import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import TextInput from 'components/Form/TextInput'
import { useAuthContext } from 'context/auth'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import { useLogin } from 'utils/hooks/useLogin'
import { LoginForm } from 'utils/types'
import * as z from 'zod'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: 'center'
  },
  paper: {
    padding: '32px 32px',
    boxShadow:'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    borderRadius: theme.spacing(1)
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
  const [ login, { loading, error } ] = useLogin()
  const { isUser } = useAuthContext()

  const methods = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const handleFormSubmit = methods.handleSubmit((data: FieldValues) => {
    login(data.email, data.password)
  })

  if (isUser) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6}>
        <Box className={classes.paper}>
          <Typography variant="h4" marginBottom={4}>Log In</Typography>
          <FormProvider {...methods}>
            <form onSubmit={handleFormSubmit} className={classes.form}>
              <TextInput
                title="Email"
                name="email"
                type="text"
                fullWidth
                size="small"
              />
              <TextInput
                title="Password"
                name="password"
                type="password"
                fullWidth
                size="small"
                autoComplete="off"
              />
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={methods.formState.isSubmitting || loading}
                >
                  Log in
                </Button>
              </Box>

              {error && <FormHelperText id="my-helper-text" error>{error?.message}</FormHelperText>}
            </form>
          </FormProvider>

        </Box>
      </Grid>
    </Grid>

  )

}

export default Login
