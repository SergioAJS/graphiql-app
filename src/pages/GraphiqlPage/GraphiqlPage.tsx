import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

import { Button } from 'components/Button/Button';
import { useFetchGraphQuery } from 'redux/useFetchGraphQuery';

const EDITOR_HEIGHT = 700;

const GraphiqlPage = () => {
  const [code, setCode] = useState(`query QueryReactions ($first: Int) {
    reactions(first: $first) {
      edges {
        node {
          Equation
          reactionEnergy
        }
      }
    }
  }
  `);
  const [query, setQuery] = useState(code);
  const { data, isLoading, error } = useFetchGraphQuery({ query, variables: { first: 20 } });
  const handleQuery = () => {
    setQuery(code);
  };

  return (
    <div className="relative mt-16 flex h-[calc(80vh-64px)] flex-grow">
      <div className="absolute left-2/4 top-1 z-20 -translate-x-1/2">
        <Button onClick={handleQuery}>Query</Button>
      </div>
      <div className="relative flex w-full" style={{ backgroundColor: '#f5f5f5' }}>
        <CodeEditor
          className="w-1/2 overflow-auto border border-b-0"
          value={code}
          language="graphql"
          onChange={(evn) => {
            setCode(evn.target.value);
          }}
          padding={15}
          minHeight={EDITOR_HEIGHT}
          style={{
            fontSize: 12,
            backgroundColor: '#f5f5f5',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
        <div className="relative w-1/2 overflow-auto border border-b-0 ">
          {isLoading && <Loading />}
          <CodeEditor
            className=" w-auto"
            value={error || data}
            readOnly
            language="graphql"
            padding={15}
            minHeight={EDITOR_HEIGHT}
            style={{
              fontSize: 12,
              backgroundColor: '#f5f5f5',
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Loading = () => (
  <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col justify-center bg-gray-300 text-center text-2xl">
    Loading
  </div>
);

export default GraphiqlPage;
