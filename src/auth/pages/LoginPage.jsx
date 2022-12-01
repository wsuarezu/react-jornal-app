import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIng, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  
  const {status, errorMessage} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkingAuthentication())  
  // }, [])

  const {email, password, onInputChange} = useForm(formData);

  const isAuthenticate = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) =>{
    event.preventDefault();
    //console.log({email, password});

    //esta no es la acción ha despachar
    dispatch(startLoginWithEmailPassword({email, password})) ;
  } 
  
  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIng());
  }
  



  

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com"
                fullWidth  
                name='email'
                value={email}
                onChange={onInputChange}
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
              />  
            </Grid>
            <Grid 
              container
              display={!!errorMessage ? '' : 'none'} 
              sx={{mt:1 }}
              >
              <Grid 
                  item xs={12}
                  
                >
                  <Alert severity='error'>
                    {errorMessage}
                  </Alert>
              </Grid>       
            </Grid>
            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth
                  type='submit'
                  disabled={isAuthenticate}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={onGoogleSignIn}
                  disabled={isAuthenticate}
                  >
                  <Google />
                  <Typography sx={{ml: 1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent="end">
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}
