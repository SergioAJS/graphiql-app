import { request, gql, Variables } from 'graphql-request';
import { useEffect, useState } from 'react';

export type QueryProps = {
  url?: string;
  query?: string;
  variables?: Variables;
  headers?: Headers;
};

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

export const DEFAULT_VARS = { first: 20 };

export const useFetchGraphQuery = ({
  url = 'https://api.catalysis-hub.org/graphql',
  query = DEFAULT_QUERY,
  variables = DEFAULT_VARS,
  headers = new Headers({ 'Content-Type': 'application/json' }),
}: QueryProps) => {
  const [data, setData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const document = gql`
    ${query}
  `;

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (!ignore) {
        try {
          const response = await request(url, document, variables, headers);
          const data = JSON.stringify(response, null, '\t');
          setData(data);
          setIsLoading(false);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Something went wrong';
          setError(message);
        }
      }
    };
    fetch();
    return () => {
      ignore = true;
    };
  }, [document, variables, headers, url]);

  return { data, isLoading, error };
};
