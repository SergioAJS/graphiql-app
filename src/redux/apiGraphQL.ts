import { Variables, gql } from 'graphql-request';

export const endpoint = `https://api.catalysis-hub.org/graphql`;

export const EXAMPLE_QUERY: string = gql`
  query CatalysisHub($first: Int) {
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

export const EXAMPLE_VARIABLES: Variables = {
  first: 3,
};
