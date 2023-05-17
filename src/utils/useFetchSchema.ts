import { GraphQLSchema, buildClientSchema, getIntrospectionQuery } from 'graphql';
import { useEffect, useState } from 'react';
import { DEFAULT_URL } from 'redux/api';

export const useFetchSchema = () => {
  const [data, setData] = useState<GraphQLSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchSchema = async () => {
      setLoading(true);
      try {
        const response = await fetch(DEFAULT_URL, {
          method: 'POST',
          signal: signal,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: getIntrospectionQuery() }),
        });
        const result = await response.json();
        const schema = buildClientSchema(result.data);
        setData(schema);
      } catch (err) {
        const message = err instanceof Error ? err.message : `$${err}`;
        setError(message);
      }
      setLoading(false);
    };

    fetchSchema();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
};
