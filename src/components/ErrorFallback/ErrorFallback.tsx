type Props = {
  error: Error;
};

export const ErrorFallback = ({ error }: Props) => {
  return (
    <div role="alert" className="flex h-[80vh] flex-col items-center justify-center">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
};
