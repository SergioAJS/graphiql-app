import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryProps } from 'types/types';

export const DEFAULT_QUERY = `query QueryReactions ($first: Int) {
  reactions(first: $first) {
    edges {
      node {
        Equation
        reactionEnergy
      }
    }
  }
}
`;

export const DEFAULT_URL = 'https://api.catalysis-hub.org/graphql';

export const DEFAULT_VARS = { first: 20 };

export const graphQLApi = createApi({
  reducerPath: 'graphQLApi',
  baseQuery: fetchBaseQuery({ baseUrl: DEFAULT_URL }),
  endpoints: (builder) => ({
    getGraphQLBy: builder.query<string, QueryProps>({
      query: ({ url = '', query = DEFAULT_QUERY, variables = DEFAULT_VARS }) => ({
        url: url,
        method: 'POST',
        body: JSON.stringify({ query: query, variables: variables }),
        headers: { 'Content-Type': 'application/json' },
      }),
      transformResponse: (response) => JSON.stringify(response, null, '\t'),
    }),
  }),
});

export const { useGetGraphQLByQuery } = graphQLApi;
