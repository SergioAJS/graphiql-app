import { request, gql, Variables } from 'graphql-request';
import { useEffect, useState } from 'react';

type Props = {
  url?: string;
  query: string;
  variables?: Variables;
  headers?: Headers;
};

const defaultQuery = `query QueryReactions {
  reactions(first: 10) {
    edges {
      node {
        Equation
        reactionEnergy
      }
    }
  }
}
`;

export const useFetchGraphQuery = ({
  url = 'https://api.catalysis-hub.org/graphql',
  query = defaultQuery,
  variables = {},
  headers = new Headers({ 'Content-Type': 'application/json' }),
}: Props) => {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
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
  return { data, loading, error };
};
