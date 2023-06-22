import React, { useEffect } from 'react';
import Post from './Post';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/post';

type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;


const Main = () => {
  const dispatch = useAppDispatch();
  const statePosts = useSelector((state: RootState) => state.posts);

  useEffect(()=> {
   dispatch(fetchPosts())
  }, [dispatch])
  return (
    <div>Main</div>
  )
}

export default Main;