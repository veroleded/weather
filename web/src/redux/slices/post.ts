import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import apiRoutes from '../../routes/apiRoutes';
import axiosInstance from '../../axios';



export interface Post {
  id: number;
  title: string,
  content?: string,
  image: null | string,
  authorId: number,
  viewCount: number,
  createdAt: Date,
  updatedAt: Date,
  likesCount: number
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axiosInstance.get(apiRoutes.getPosts());
  return data;
});

const postAdapter = createEntityAdapter();

const initialState = postAdapter.getInitialState();

const postSlice = createSlice({
  name: 'posts',
  initialState: { ...initialState, status: 'loading' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, {payload}) => {
        const ids: number[] = [];
        const entities: Record<string, Post> = {};
        (payload as unknown as Post[]).forEach((post) => {
        ids.push(post.id);
        entities[post.id] = post;
       })
       state.entities = entities;
       state.ids = ids;
        state.status = 'load';
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const postsReducer = postSlice.reducer;
