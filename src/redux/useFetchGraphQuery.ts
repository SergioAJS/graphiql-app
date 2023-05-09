import { request, gql } from 'graphql-request';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';

export const useFetchGraphQuery = () => {
  const [data, setData] = useState<unknown>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const document = gql`
    {
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
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (!ignore) {
        try {
          const response = await request('https://api.catalysis-hub.org/graphql', document);
          const data = JSON.stringify(response, null, '\t');
          setData(data);
          setLoading(false);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Somethin went wrong';
          setError(message);
        }
      }
    };
    fetch();
    return () => {
      ignore = true;
    };
  }, [document]);
  return [data, loading, error];
};
