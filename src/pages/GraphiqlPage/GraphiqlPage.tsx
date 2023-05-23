import { ChangeEvent, lazy, useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { useCollapse } from 'react-collapsed';

import { Button } from 'components/Button/Button';
import { TabSelector } from 'components/TabSelector/TabSelector';
import { DEFAULT_HEADER, DEFAULT_QUERY, DEFAULT_VARS, useGetGraphQLByQuery } from 'redux/api';
import { QueryProps } from 'types/types';
import { errorFetchHandler } from 'utils/errorFetchHandler';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setGraphQL } from 'redux/querySlice';
import { Loading } from 'components/Loading/Loading';

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
  const graphQL = useAppSelector((state) => state.query.graphQL);
  const dispatch = useAppDispatch();
  const [graphQuery, setGraphQuery] = useState<QueryProps>({
    query: DEFAULT_QUERY,
    variables: DEFAULT_VARS,
    headers: DEFAULT_HEADER,
  });
  const { data, isFetching, error, isError } = useGetGraphQLByQuery(graphQuery);
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse({
    duration: 600,
  });

  useEffect(() => {
    if (!graphQL) return;
    handleQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleQuery() {
    let parsedHeaders = { 'Content-Type': 'application/json' };
    let parsedVariables = {};
    try {
      parsedVariables = JSON.parse(graphQL.variables);
    } catch {
      /* add some logic, for example toast */
    }
    try {
      parsedHeaders = JSON.parse(graphQL.headers);
    } catch {
      /* add some logic, for example toast */
    }
    setGraphQuery({ query: graphQL.query, variables: parsedVariables, headers: parsedHeaders });
  }

  return (
    <>
      <div className="absolute flex h-full min-h-full w-full flex-row ">
        <DocTabPanel />
      </div>
      <div className="relative mt-16 flex h-[93vh] flex-grow">
        <div className="absolute left-2/4 top-1 z-20 -translate-x-1/2">
          <Button size="small" onClick={handleQuery}>
            Query
          </Button>
        </div>
        <div className="relative flex w-full" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="w-1/2 overflow-auto border border-b-0">
            <CodeEditor
              value={graphQL.query}
              onChange={(evn: ChangeEvent<HTMLTextAreaElement>) => {
                dispatch(
                  setGraphQL({
                    ...graphQL,
                    query: evn.target.value,
                  })
                );
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
                  value={graphQL.variables}
                  onChange={(evn: ChangeEvent<HTMLTextAreaElement>) => {
                    dispatch(
                      setGraphQL({
                        ...graphQL,
                        variables: evn.target.value,
                      })
                    );
                  }}
                  {...EDITOR_STYLES}
                />
              </TabPanel>
              <TabPanel hidden={selectedTab !== 'Headers'}>
                <CodeEditor
                  value={graphQL.headers}
                  onChange={(evn: ChangeEvent<HTMLTextAreaElement>) => {
                    dispatch(
                      setGraphQL({
                        ...graphQL,
                        headers: evn.target.value,
                      })
                    );
                  }}
                  {...EDITOR_STYLES}
                />
              </TabPanel>
            </section>
          </div>
          {isFetching ? (
            <Loading className="w-1/2" />
          ) : (
            <div className="relative w-1/2 overflow-auto border border-b-0 ">
              <CodeEditor
                value={isError ? errorFetchHandler(error) : data}
                readOnly
                {...EDITOR_STYLES}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GraphiqlPage;
