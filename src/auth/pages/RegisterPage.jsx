import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El campo nombre es obligatorio'],

}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const  [formSubmmited, setFormSubmmited] = useState(false);

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    displayName, email, password, onInputChange, formState,
    displayNameValid, emailValid, passwordValid, isFormValid
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmmited(true);
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title='Crear cuenta'>
      <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder="Nombre completo"
                fullWidth  
                name='displayName'
                value={displayName}
                onChange={onInputChange}
                error = {!!displayNameValid && formSubmmited}
                helperText={displayNameValid}
              />
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com"
                fullWidth  
                name='email'
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmmited}
                helperText={emailValid}
              />
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth 
                name='password'
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmmited}
                helperText={passwordValid}
              />  
            </Grid>
            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid 
                item xs={12}
                display={!!errorMessage ? '' : 'none'} 
              >
                <Alert severity='error'>
                  {errorMessage}
                </Alert>
              </Grid>
              <Grid item xs={12} >
                <Button 
                  variant="contained" 
                  fullWidth
                  type='submit'
                  disabled= {isCheckingAuthentication}
                  >
                  Crear cuenta
                </Button>
              </Grid>
              
            </Grid>
            <Grid container direction='row' justifyContent="end">
              <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}
