type Variables = {
  [x: string]: unknown;
};

export type QueryProps = {
  url?: string;
  query?: string;
  variables?: Variables;
  headers?: Headers;
};
