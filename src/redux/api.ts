import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const graphQLApi = createApi({
  reducerPath: 'graphQLApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://api.catalysis-hub.org/graphql' }),
  endpoints: (builder) => ({
    getGraphQLBy: builder.query<unknown, string>({ query: (query) => `?query=${query}` }),
  }),
});

export const { useGetGraphQLByQuery } = graphQLApi;
