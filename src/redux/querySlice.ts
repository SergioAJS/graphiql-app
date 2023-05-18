import { DEFAULT_HEADER, DEFAULT_QUERY, DEFAULT_VARS } from './api';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IGraphQLProps {
  headers: string;
  query: string;
  url: string;
  variables: string;
}

export interface IQueryState {
  graphQL: IGraphQLProps;
}

const initialState: IQueryState = {
  graphQL: {
    headers: JSON.stringify(DEFAULT_HEADER),
    query: DEFAULT_QUERY,
    url: '',
    variables: JSON.stringify(DEFAULT_VARS),
  },
};

const querySlice = createSlice({
  name: 'graphQL',
  initialState,
  reducers: {
    setGraphQL(state, action: PayloadAction<IGraphQLProps>) {
      state.graphQL = action.payload;
    },
  },
});

export default querySlice.reducer;
export const { setGraphQL } = querySlice.actions;
