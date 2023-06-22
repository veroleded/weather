import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import WarningSvg from './WarningSvg';
import { fetchRegister, selectIsAuth } from '../redux/slices/auth';
import type { AppDispatch } from '../redux/store';

type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .min(8, 'Минимальная длина 8 символов')
    .email('Неверный формат')
    .required('Введите email'),
  name: Yup.string().min(3, 'Минимальная длина 3 символа').required('Введите имя'),
  password: Yup.string().min(8, 'Минимальная длина 8 символов').required('Введите пароль'),
});

const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [isErrorAuth, setIsErrorAuth] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      setSending(true);
      const data = await dispatch(fetchRegister(values));
      if (data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      } else {
        console.log(isAuth);
        setIsErrorAuth(true);
      }
      setSending(false);
    },
  });
  return (
    <div className="wrapper flex">
      <div className="auth-form-container flex">
        <h1>{'Регистрация'}</h1>

        <form className="authForm flex w-full" onSubmit={formik.handleSubmit}>
          <label htmlFor="email" />
          <input
            type="text"
            name="email"
            id="email"
            className="input w-90"
            onChange={formik.handleChange}
            onFocus={() => setIsErrorAuth(false)}
            value={formik.values.email}
            aria-label="email"
            placeholder="Email"
          />
          {formik.errors.email && (
            <div className="error flex">
              <WarningSvg /> <span>{formik.errors.email}</span>
            </div>
          )}

          <label htmlFor="name" />
          <input
            type="text"
            name="name"
            id="name"
            className="input w-90"
            onChange={formik.handleChange}
            onFocus={() => setIsErrorAuth(false)}
            value={formik.values.name}
            aria-label="name"
            placeholder="Имя"
          />
          {formik.errors.name && (
            <div className="error flex">
              <WarningSvg /> <span>{formik.errors.name}</span>
            </div>
          )}

          <label htmlFor="password" />
          <input
            type="password"
            name="password"
            id="password"
            className="input w-90"
            onChange={formik.handleChange}
            onFocus={() => setIsErrorAuth(false)}
            value={formik.values.password}
            aria-label="пароль"
            placeholder="Пароль"
          />
          {formik.errors.password && (
            <div className="error flex">
              <WarningSvg /> <span>{formik.errors.password}</span>
            </div>
          )}
          {isErrorAuth && (
            <div className="form-error flex">
              <WarningSvg /> <span>{'Пользователь с таким email уже существует'}</span>
            </div>
          )}
          <button type="submit" disabled={sending} className="btn w-90">
            {'Зарегистрироваться'}
          </button>
          <p className="pb-5">
            <span>{'Уже есть аккаунт? '}</span>
            <Link to={'/login'} className="link">
              {'Войти'}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
