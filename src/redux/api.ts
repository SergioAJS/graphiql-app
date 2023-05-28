import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IntrospectionQuery, getIntrospectionQuery } from 'graphql';

import { QueryProps } from 'types/types';

export const DEFAULT_QUERY = `query QueryReactions ($first: Int) {
  reactions(first: $first) {
    edges {
      node {
        Equation
        chemicalComposition
        reactionEnergy
      }
    }
  }
}
`;

export const DEFAULT_HEADER = { 'Content-Type': 'application/json' };

export const DEFAULT_URL = 'https://api.catalysis-hub.org/graphql';

export const DEFAULT_VARS = { first: 20 };

export const graphQLApi = createApi({
  reducerPath: 'graphQLApi',
  baseQuery: fetchBaseQuery({ baseUrl: DEFAULT_URL }),
  endpoints: (builder) => ({
    getGraphQLBy: builder.query<string, QueryProps>({
      query: ({ query, variables, headers }) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({ query: query, variables: variables }),
        headers: headers,
      }),
    }),
    getGraphQLSchema: builder.query<string, QueryProps>({
      query: ({ url = '' }) => ({
        url: url,
        method: 'POST',
        body: JSON.stringify({ query: getIntrospectionQuery() }),
        headers: { 'Content-Type': 'application/json' },
      }),
      transformResponse: (response: { data: IntrospectionQuery }) => JSON.stringify(response.data),
    }),
  }),
});

export const { useGetGraphQLByQuery, useGetGraphQLSchemaQuery } = graphQLApi;
