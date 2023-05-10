import { ChangeEvent, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { TabPanel, useTabs } from 'react-headless-tabs';

import { Button } from 'components/Button/Button';
import { QueryProps, useFetchGraphQuery } from 'redux/useFetchGraphQuery';
import { TabSelector } from 'components/TabSelector/TabSelector';

const EDITOR_STYLES = {
  className: 'w-auto',
  language: 'graphql',
  style: {
    fontSize: 12,
    backgroundColor: '#f5f5f5',
    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
  },
  padding: 15,
};

const DEFAULT_VARS = { first: 20 };

const DEFAULT_QUERY = `query QueryReactions ($first: Int) {
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

const GraphiqlPage = () => {
  const [selectedTab, setSelectedTab] = useTabs(['Variables', 'Headers']);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [variables, setVariables] = useState(JSON.stringify(DEFAULT_VARS));
  const [headers, setHeaders] = useState('');
  const [graphQuery, setGraphQuery] = useState<QueryProps>({
    variables: DEFAULT_VARS,
    query: DEFAULT_QUERY,
  });
  const { data, isLoading, error } = useFetchGraphQuery(graphQuery);
  const handleQuery = () => {
    try {
      const parsedVariables = JSON.parse(variables);
      const parsedHeaders = JSON.parse(headers);
      setGraphQuery({ variables: parsedVariables, query, headers: parsedHeaders });
    } catch {
      /* add some logic */
    }
  };

  return (
    <div className="relative mt-16 flex h-[calc(80vh-16rem)] flex-grow">
      <div className="absolute left-2/4 top-1 z-20 -translate-x-1/2">
        <Button onClick={handleQuery}>Query</Button>
      </div>
      <div className="relative flex w-full" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="w-1/2 overflow-auto border border-b-0">
          <CodeEditor
            value={query}
            onChange={(evn: ChangeEvent<HTMLTextAreaElement>) => {
              setQuery(evn.target.value);
            }}
            {...EDITOR_STYLES}
          />
          <nav className="border-b border-gray-300">
            <TabSelector
              isActive={selectedTab === 'Variables'}
              onClick={() => setSelectedTab('Variables')}
            >
              Variables
            </TabSelector>
            <TabSelector
              isActive={selectedTab === 'Headers'}
              onClick={() => setSelectedTab('Headers')}
            >
              Headers
            </TabSelector>
          </nav>
          <div>
            <TabPanel hidden={selectedTab !== 'Variables'}>
              <CodeEditor
                value={variables}
                onChange={(evn: ChangeEvent<HTMLTextAreaElement>) => {
                  setVariables(evn.target.value);
                }}
                {...EDITOR_STYLES}
              />
            </TabPanel>
            <TabPanel hidden={selectedTab !== 'Headers'}>
              <CodeEditor
                value={headers}
                onChange={(evn: ChangeEvent<HTMLTextAreaElement>) => {
                  setHeaders(evn.target.value);
                }}
                {...EDITOR_STYLES}
              />
            </TabPanel>
          </div>
        </div>
        <div className="relative w-1/2 overflow-auto border border-b-0 ">
          {isLoading && <Loading />}
          <CodeEditor value={error || data} readOnly {...EDITOR_STYLES} />
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
