import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  user: boolean | null;
  isLoading: boolean;
}

const initialState: IUserState = {
  user: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login, logout, setLoading } = userSlice.actions;
