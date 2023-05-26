import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  userAuth: {
    isUserAuth: boolean | null;
    isUserLoading: boolean;
  };
}

const initialState: IUserState = {
  userAuth: {
    isUserAuth: null,
    isUserLoading: true,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userAuth = action.payload;
    },
    logout: (state) => {
      state.userAuth.isUserAuth = null;
    },
    setLoading: (state, action) => {
      state.userAuth.isUserLoading = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login, logout, setLoading } = userSlice.actions;
