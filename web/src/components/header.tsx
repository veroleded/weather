import React from 'react';
import { logout, selectIsAuth } from '../redux/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';

type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const onClick = (isAuth: boolean) => () => {
    if (isAuth) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      console.log(isAuth);
    } else {
      navigate('/login')
    }
  };

  return (
    <header className="flex">
      <div className="logo"><Link className='header-link' to={'/'}>Veroled blog</Link></div>
      <div className="user-icon-container">
        {isAuth ? (
          <>
            <Link className='header-link' to={'/profile'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            </Link>
            <button className="btn" onClick={onClick(isAuth)}>
              {'Выйти'}
            </button>
          </>
        ) :  <button className="btn" onClick={onClick(isAuth)}>
        {'Войти/Зарегестрироваться'}
      </button>}
      </div>
    </header>
  );
};

export default Header;
