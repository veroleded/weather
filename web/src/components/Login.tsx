import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import WarningSvg from './WarningSvg';
import { fetchAuth } from '../redux/slices/auth';
import type { AppDispatch } from '../redux/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
const useAppDispatch: DispatchFunc = useDispatch

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Неверный формат').required('Введите email'),
  password: Yup.string().min(8, 'Минимальная длина 8 символов').required('Введите пароль'),
});

export const Login = () => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(fetchAuth(values))
    },
  });
  return (
    <div className="wrapper flex">
      <div className="auth-form-container flex">
        <h1>Вход</h1>

        <form className="authForm flex w-full" onSubmit={formik.handleSubmit}>

          <label htmlFor="email"/>
            <input
              type="text"
              name="email"
              id="email"
              className="auth-input w-90"
              onChange={formik.handleChange}
              value={formik.values.email}
              aria-label="email"
              placeholder='Email'
            />
          {formik.errors.email && (
            <div className="form-error flex">
              <WarningSvg /> <span>{formik.errors.email}</span>
            </div>
          )}

          <label htmlFor="password" />
            <input
              type="text"
              name="password"
              id="password"
              className="auth-input w-90"
              onChange={formik.handleChange}
              value={formik.values.password}
              aria-label="пароль"
              placeholder='Пароль'
            />
          {formik.errors.password && (
            <div className="form-error flex">
              <WarningSvg /> <span>{formik.errors.password}</span>
            </div>
          )}

          <button type="submit" className="btn w-90">
            Войти
          </button>
          <p className='pb-5'>
            <span>{'Нет аккаута? '}</span>
            <Link to={'/register'} className='link'>{'Зарегестрироваться'}</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
