import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from 'App';
import './index.css';
import { UserProvider } from 'utils/userContext';
import 'translation/i18n';
// import { store } from 'redux/store';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      {/* <Provider store={store}> */}
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
      {/* </Provider> */}
    </UserProvider>
  </React.StrictMode>
);
