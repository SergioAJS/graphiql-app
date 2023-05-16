import { useState } from 'react';
import { DocExplorer } from '@usebruno/graphql-docs';

import { useFetchSchema } from 'utils/useFetchSchema';
import { Button } from 'components/Button/Button';

const DocTabPanel = () => {
  const [showDoc, setShowDoc] = useState(false);
  const { data } = useFetchSchema();
  const toggleDoc = () => setShowDoc((showDoc) => !showDoc);

  return (
    <>
      <div className="absolute left-full top-1/4 z-30 block -translate-x-full -translate-y-1/2 -rotate-90">
        {data && <Button onClick={toggleDoc}>Schema</Button>}
      </div>
      <div className="relative flex flex-grow flex-col">
        {data && (
          <>
            <div className={`graphql-docs-explorer-container ${showDoc ? '' : 'hidden'}`}>
              <DocExplorer schema={data}>
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
