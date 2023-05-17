import { ChangeEvent, lazy, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { useCollapse } from 'react-collapsed';

import { Button } from 'components/Button/Button';
import { TabSelector } from 'components/TabSelector/TabSelector';
import { DEFAULT_QUERY, DEFAULT_VARS, useGetGraphQLByQuery } from 'redux/api';
import { QueryProps } from 'types/types';
import { errorFetchHandler } from 'utils/errorFetchHandler';

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

const DocTabPanel = lazy(() => import('components/DocTabPanel/DocTabPanel'));

const GraphiqlPage = () => {
  const [selectedTab, setSelectedTab] = useTabs(['Variables', 'Headers']);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [variables, setVariables] = useState(JSON.stringify(DEFAULT_VARS));
  const [headers, setHeaders] = useState('');
  const [graphQuery, setGraphQuery] = useState<QueryProps>({});
  const { data, isFetching, error, isError } = useGetGraphQLByQuery(graphQuery);
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse({
    duration: 600,
  });
  const handleQuery = () => {
    let parsedHeaders = new Headers({ 'Content-Type': 'application/json' });
    let parsedVariables = {};
    try {
      parsedVariables = JSON.parse(variables);
    } catch {
      /* add some logic, for example toast */
    }
    try {
      parsedHeaders = JSON.parse(headers);
    } catch {
      /* add some logic, for example toast */
    }
    setGraphQuery({ query, variables: parsedVariables, headers: parsedHeaders });
  };

  return (
    <>
      <div className="absolute flex h-full min-h-full w-full flex-row ">
        <DocTabPanel />
      </div>
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
            <nav className="flex justify-between border-b border-gray-300">
              <div>
                <TabSelector
                  isActive={selectedTab === 'Variables'}
                  onClick={() => {
                    setSelectedTab('Variables');
                    setExpanded(true);
                  }}
                >
                  Variables
                </TabSelector>
                <TabSelector
                  isActive={selectedTab === 'Headers'}
                  onClick={() => {
                    setSelectedTab('Headers');
                    setExpanded(true);
                  }}
                >
                  Headers
                </TabSelector>
              </div>
              <button {...getToggleProps()} className="px-5 text-ssm">
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
            </nav>
            <section {...getCollapseProps()}>
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
            </section>
          </div>
          <div className="relative w-1/2 overflow-auto border border-b-0 ">
            {isFetching && <Loading />}
            <CodeEditor
              value={isError ? errorFetchHandler(error) : data}
              readOnly
              {...EDITOR_STYLES}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Loading = () => (
  <div className="text-2xl absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col justify-center bg-gray-300 text-center">
    Loading
  </div>
);

export default GraphiqlPage;
