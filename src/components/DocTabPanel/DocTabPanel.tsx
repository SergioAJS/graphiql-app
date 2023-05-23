import { useState } from 'react';
import { DocExplorer } from '@usebruno/graphql-docs';

import { Button } from 'components/Button/Button';
import { useGetGraphQLSchemaQuery } from 'redux/api';
import { buildClientSchema } from 'graphql/utilities';

const DocTabPanel = () => {
  const [showDoc, setShowDoc] = useState(false);
  const { data } = useGetGraphQLSchemaQuery({ url: '' });
  const toggleDoc = () => setShowDoc((showDoc) => !showDoc);

  return (
    <>
      <div className="absolute left-full top-1/4 z-30 block -translate-x-full -translate-y-1/2 -rotate-90">
        {data && (
          <Button transform size="small" variant="inform" onClick={toggleDoc}>
            Schema
          </Button>
        )}
      </div>
      <div className="relative flex flex-grow flex-col">
        {data && (
          <>
            <div className={`graphql-docs-explorer-container ${showDoc ? '' : 'hidden'}`}>
              <DocExplorer schema={buildClientSchema(JSON.parse(data))}>
                <button
                  className="mr-2"
                  onClick={toggleDoc}
                  aria-label="Close Documentation Explorer"
                >
                  {'\u2715'}
                </button>
              </DocExplorer>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DocTabPanel;
