import { lazy, useEffect, useState } from 'react';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { useCollapse } from 'react-collapsed';
import { useTranslation } from 'react-i18next';
import { buildClientSchema } from 'graphql/utilities';
import { graphql } from 'cm6-graphql';
import CodeMirror from '@uiw/react-codemirror';

import { Button } from 'components/Button/Button';
import { TabSelector } from 'components/TabSelector/TabSelector';
import {
  DEFAULT_HEADER,
  DEFAULT_QUERY,
  DEFAULT_VARS,
  useGetGraphQLByQuery,
  useGetGraphQLSchemaQuery,
} from 'redux/api';
import { QueryProps } from 'types/types';
import { errorFetchHandler } from 'utils/errorFetchHandler';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setGraphQL } from 'redux/querySlice';
import { Loading } from 'components/Loading/Loading';
import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { ToastContainer } from 'components/Toast/ToastContainer';
import { addToast } from 'redux/toastSlice';
import { myTheme } from 'utils/myTheme';

const EDITOR_OPTIONS = {
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
  const { t } = useTranslation('graphiqlPage');
  const [selectedTab, setSelectedTab] = useTabs(['Variables', 'Headers']);
  const graphQL = useAppSelector((state) => state.query.graphQL);
  const toasts = useAppSelector((state) => state.toastList.toasts);
  const dispatch = useAppDispatch();
  const [graphQuery, setGraphQuery] = useState<QueryProps>({
    query: DEFAULT_QUERY,
    variables: DEFAULT_VARS,
    headers: DEFAULT_HEADER,
  });
  const { data, isFetching, error, isError } = useGetGraphQLByQuery(graphQuery);
  const { data: schema } = useGetGraphQLSchemaQuery({ url: '' });
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse({
    duration: 600,
  });

  useEffect(() => {
    if (!graphQL) return;
    handleQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleQuery() {
    let errorVariables = false;
    let parsedHeaders = { 'Content-Type': 'application/json' };
    let parsedVariables = {};
    try {
      if (graphQL.variables) {
        parsedVariables = JSON.parse(graphQL.variables);
      }
    } catch {
      errorVariables = true;
      dispatch(
        addToast({
          message: 'Variables section cannot be parsed',
          type: 'danger',
          id: Date.now(),
        })
      );
    }
    try {
      if (graphQL.headers) {
        parsedHeaders = { ...parsedHeaders, ...JSON.parse(graphQL.headers) };
      }
    } catch {
      dispatch(
        addToast({
          message: 'Headers section cannot be parsed',
          type: 'danger',
          id: Date.now(),
        })
      );
    }
    if (errorVariables) return;
    setGraphQuery({ query: graphQL.query, variables: parsedVariables, headers: parsedHeaders });
  }

  return (
    <>
      <ToastContainer toasts={toasts} />
      <div className="absolute flex h-full min-h-full w-full flex-row pt-16">
        <DocTabPanel />
      </div>
      <div className="relative mt-16 flex h-[93vh] flex-grow">
        <div className="absolute left-2/4 top-1 z-20 -translate-x-1/2">
          <Button size="small" onClick={handleQuery}>
            <PlayIcon />
          </Button>
        </div>
        <div className="relative flex w-full" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="flex w-1/2 flex-col justify-between border border-b-0">
            <div className="overflow-auto">
              {schema && (
                <CodeMirror
                  value={graphQL.query}
                  theme={myTheme}
                  extensions={[graphql(buildClientSchema(JSON.parse(schema)))]}
                  onChange={(value: string) => {
                    dispatch(
                      setGraphQL({
                        ...graphQL,
                        query: value,
                      })
                    );
                  }}
                />
              )}
            </div>
            <div
              className={`flex flex-col ${
                isExpanded ? 'max-h-[33.3333%] min-h-[33.3333%]' : 'max-h-[33.3333%]'
              }`}
            >
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
                <button {...getToggleProps()} className="text-ssm px-5">
                  {t(isExpanded ? 'Collapse' : 'Expand')}
                </button>
              </nav>
              <section {...getCollapseProps()} className="overflow-hidden">
                <TabPanel hidden={selectedTab !== 'Variables'}>
                  <CodeMirror
                    value={graphQL.variables}
                    theme={myTheme}
                    onChange={(value: string) => {
                      dispatch(
                        setGraphQL({
                          ...graphQL,
                          variables: value,
                        })
                      );
                    }}
                    {...EDITOR_OPTIONS}
                  />
                </TabPanel>
                <TabPanel hidden={selectedTab !== 'Headers'}>
                  <CodeMirror
                    value={graphQL.headers}
                    theme={myTheme}
                    onChange={(value: string) => {
                      dispatch(
                        setGraphQL({
                          ...graphQL,
                          headers: value,
                        })
                      );
                    }}
                    {...EDITOR_OPTIONS}
                  />
                </TabPanel>
              </section>
            </div>
          </div>
          {isFetching ? (
            <Loading className="w-1/2" />
          ) : (
            <div className="relative w-1/2 overflow-auto border border-b-0 ">
              <CodeMirror
                theme={myTheme}
                value={isError ? errorFetchHandler(error) : JSON.stringify(data, null, '\t')}
                readOnly
                basicSetup={{
                  lineNumbers: false,
                  foldGutter: false,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GraphiqlPage;
