import { QueryProps } from 'types/types';
import { DEFAULT_QUERY, DEFAULT_VARS } from './api';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IQueryState {
  query: QueryProps;
}

const initialState: IQueryState = {
  query: {
    headers: { 'Content-Type': 'application/json' },
    query: DEFAULT_QUERY,
    url: '',
    variables: DEFAULT_VARS,
  },
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<QueryProps>) {
      state.query = action.payload;
    },
  },
});

export default querySlice.reducer;
export const { setQuery } = querySlice.actions;
