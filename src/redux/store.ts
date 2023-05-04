import { configureStore } from '@reduxjs/toolkit/dist/configureStore';
import { setupListeners } from '@reduxjs/toolkit/query';

import { graphQLApi } from './api';

export const store = configureStore({
  reducer: {
    [graphQLApi.reducerPath]: graphQLApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphQLApi.middleware),
});

setupListeners(store.dispatch);
