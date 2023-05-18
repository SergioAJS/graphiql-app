type Variables = {
  [x: string]: unknown;
};

type Headers = {
  [x: string]: string | undefined;
};

export type QueryProps = {
  url?: string;
  query?: string;
  variables?: Variables;
  headers?: Headers;
};
