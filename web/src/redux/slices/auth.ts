import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRoutes from '../../routes/apiRoutes';
import axiosInstance from '../../axios';
import { RootState } from '../store';

export interface IUserData {
  id: number;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface IStateAuth {
  data: IUserData | null;
  status: 'loading' | 'load' | 'error';
  isAuth: boolean
}

const initialState: IStateAuth = {
  data: null,
  status: 'loading',
  isAuth: false,
};

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (value: { email: string; password: string }) => {
    const { data } = await axiosInstance.post(apiRoutes.login(), value);
    return data;
  },
);

export const fetchAuthMe = createAsyncThunk(
  'auth/fetchAuthMe',
  async () => {
    const { data } = await axiosInstance.get(apiRoutes.me());
    return data;
  },
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (value: { email: string; password: string, name: string }) => {
    const { data } = await axiosInstance.post(apiRoutes.register(), value);
    return data;
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.isAuth = false;
    },
    changeData: (state, { payload }) => {
      state.data = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.isAuth = false;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'load';
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error';
        state.isAuth = false;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading';
        state.isAuth = false;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = 'load';
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = 'error';
        state.isAuth = false;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.isAuth = false;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'load';
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = 'error';
        state.isAuth = false;
      });
  },
});

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const authReducer = authSlice.reducer;
export const { logout, changeData } = authSlice.actions;
