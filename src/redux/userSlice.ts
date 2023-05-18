import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  user: boolean | null;
}

const initialState: IUserState = {
  user: null,
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
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
