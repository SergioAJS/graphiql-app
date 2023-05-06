import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

import { Button } from 'components/Button/Button';
import { useGetGraphQLByQuery } from 'redux/api';

type LoadingProps = {
  loading: boolean;
};

const EDITOR_HEIGHT = 700;
const GraphiqlPage = () => {
  const [code, setCode] = useState(`{
    reactions(first: 10) {
      edges {
        node {
          Equation
          chemicalComposition
          reactionEnergy
        }
      }
    }
  }
  `);
  const [readOnly, setReadOnly] = useState('');
  const [query, setQuery] = useState(code);
  const { data } = useGetGraphQLByQuery(query);

  const handleQuery = () => {
    setQuery(code);
    const result = JSON.stringify(data, null, '\t');
    setReadOnly(result);
  };

  return (
    <>
      <div className="relative mt-[10vh] flex flex-grow flex-col ">
        <div className="absolute left-2/4 top-1 z-20 -translate-x-1/2">
          <Button onClick={handleQuery}>Query</Button>
        </div>
        <div className="relative flex w-full overflow-auto">
          <CodeEditor
            className="w-1/2 border border-b-0 "
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
          <div className="relative w-1/2 border border-b-0 ">
            <Loading loading={false} />
            <CodeEditor
              className="w-auto "
              value={readOnly}
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
    </>
  );
};

export default GraphiqlPage;

const Loading = ({ loading }: LoadingProps) => (
  <div
    className="absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col justify-center text-center"
    /*style={{
      background: 'rgba(51, 51, 51, 0.62)',
      color: 'white',
    }} */
  >
    {loading && 'Loading'}
  </div>
);
