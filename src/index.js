import React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import { AppApolloClient } from './app-apollo-client';
console.log(React.version);
ReactDOM.render(
  <AppApolloClient>
    <App />
  </AppApolloClient>,
  document.getElementById('root')
);
registerServiceWorker();
