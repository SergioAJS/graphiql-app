import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IToast } from 'components/Toast/Toast';

interface ToastListState {
  toasts: IToast[];
}

const initialState: ToastListState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: 'toastList',
  initialState,
  reducers: {
    addToast: (state, { payload }: PayloadAction<IToast>) => {
      state.toasts.push(payload);
    },
    removeToast: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== payload.id);
    },
  },
});

export default toastSlice.reducer;
export const { addToast, removeToast } = toastSlice.actions;
