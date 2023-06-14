import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRoutes from '../../routes/apiRoutes';
import axiosInstance from '../../axios';

interface IUserData {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface IState {
  data: IUserData | null;
  status: 'loading' | 'load' | 'error';
}

const initialState: IState = {
  data: null,
  status: 'loading',
};

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (value: { email: string; password: string }) => {
    const { data } = await axiosInstance.post(apiRoutes.login(), value);
    return data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'load';
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const authReducer = authSlice.reducer;
