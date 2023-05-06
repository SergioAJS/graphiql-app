import { configureStore } from '@reduxjs/toolkit/';
import { setupListeners } from '@reduxjs/toolkit/query';

import { graphQLApi } from './api';

export const store = configureStore({
  reducer: {
    [graphQLApi.reducerPath]: graphQLApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphQLApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
