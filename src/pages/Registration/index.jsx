import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors,
      isValid
    }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: "onChange"
  })
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Failed to rigistor!')
    }

    console.log("ok")
    if ('token' in data.payload) {
      window.localStorage.setItem("token", data.payload.token)
    }
    console.log(data)

  }


  if (isAuth) {
    return <Navigate to='/' />
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField className={styles.field}
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('name', { required: 'Enter your fullName' })}
          fullWidth />

        <TextField className={styles.field} label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter your email' })}
          fullWidth />

        <TextField className={styles.field} label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Create new password' })}
          fullWidth />

        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>

    </Paper>
  );
};
