import React, { useEffect } from 'react';
import Header from './header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Profile from './Profile/Profile';
import { AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe } from '../redux/slices/auth';

type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
