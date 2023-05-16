import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Variables = {
  [x: string]: string;
};

type Props = {
  query: string;
  headers?: Headers;
  variables?: Variables;
};

export const graphQLApi = createApi({
  reducerPath: 'graphQLApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.catalysis-hub.org/graphql' }),
  endpoints: (builder) => ({
    getGraphQLBy: builder.query<string, Props>({
      query: ({ query, variables }) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({ query: query, vairables: variables }),
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const { useGetGraphQLByQuery } = graphQLApi;
