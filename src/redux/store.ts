import { configureStore } from '@reduxjs/toolkit/';
import { setupListeners } from '@reduxjs/toolkit/query';

import { graphQLApi } from './api';
import querySlice from './querySlice';
import userSlice from './userSlice';
import toastSlice from './toastSlice';

export const store = configureStore({
  reducer: {
    query: querySlice,
    user: userSlice,
    toastList: toastSlice,
    [graphQLApi.reducerPath]: graphQLApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphQLApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
