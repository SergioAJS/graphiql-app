import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
// import { useGetGraphQLByQuery } from 'redux/api';
import * as monaco from 'monaco-editor';
import Container from 'components/Container/Container';
import { request, Variables } from 'graphql-request';
import { EXAMPLE_QUERY, EXAMPLE_VARIABLES, endpoint } from 'redux/apiGraphQL';
import { useQuery } from 'react-query';

export const MonacoPage = () => {
  const [code, setCode] = useState<string>(EXAMPLE_QUERY);
  const [variablesInput, setVariablesInput] = useState(JSON.stringify(EXAMPLE_VARIABLES));
  const [variables, setVariables] = useState<Variables>(JSON.parse(variablesInput));
  const [query, setQuery] = useState(code);

  const { data } = useQuery('catalysisHub', async () => {
    return await request(endpoint, query, variables);
  });

  const handleQuery = () => {
    setQuery(code);
    setVariables(JSON.parse(variablesInput));
  };

  const handleCodeChange = (
    newCode: string | undefined,
    e: monaco.editor.IModelContentChangedEvent
  ) => {
    if (newCode) setCode(newCode);
    console.log(newCode, e);
  };

  const handleVariablesInputChange = (
    newVariables: string | undefined,
    e: monaco.editor.IModelContentChangedEvent
  ) => {
    if (newVariables) setVariablesInput(newVariables);
    console.log(newVariables, e);
  };

  return (
    <>
      <div
        className="flex-grow bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/signup.webp)` }}
      >
        <Container>
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-full">
              <div className="flex w-1/2 flex-col">
                <Editor
                  height="70vh"
                  width="100%"
                  defaultLanguage="graphql"
                  defaultValue={code}
                  className="mt-20"
                  value={code}
                  onChange={handleCodeChange}
                  options={{
                    automaticLayout: true,
                    smoothScrolling: true,
                    minimap: {
                      autohide: true,
                    },
                  }}
                />
                <div className="flex w-full">
                  <Editor
                    height="20vh"
                    defaultLanguage="graphql"
                    defaultValue={variablesInput}
                    value={variablesInput}
                    onChange={handleVariablesInputChange}
                  ></Editor>
                  <Editor height="20vh" defaultLanguage="graphql"></Editor>
                </div>
              </div>
              <Editor
                height="90vh"
                width="50%"
                defaultLanguage="json"
                defaultValue="GraphiQL Catalysis Hub"
                className="mt-20"
                value={JSON.stringify(data, null, '\t')}
                options={{
                  readOnly: true,
                  automaticLayout: true,
                  smoothScrolling: true,
                  scrollBeyondLastLine: false,
                  tabSize: 2,
                }}
              />
            </div>
            <button className="header-button mt-3" onClick={handleQuery}>
              Fetch
            </button>
          </div>
        </Container>
      </div>
    </>
  );
};
