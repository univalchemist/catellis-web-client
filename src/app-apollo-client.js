import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import * as authResolvers from 'shared/auth/resolvers';
import { defaultState as authDefaultState } from 'shared/auth/state';
import * as restMgmtStateResolvers from 'restmgmt/store/resolvers';
import { defaultState as restMgmtDefaultState } from 'restmgmt/store';

const memCache = new InMemoryCache();

const defaults = {
  __typename: 'DataStore',
  networkStatus: {
    __typename: 'NetworkStatus',
    isConnected: false
  },
  ...authDefaultState,
  ...restMgmtDefaultState
};

const stateLink = withClientState({
  cache: memCache,
  resolvers: {
    Mutation: {
      // TODO: This is exploratory and should be removed in a later version.
      updateNetworkStatus: (
        _: {},
        {isConnected}: {isConnected: boolean},
        {cache}: {cache: InMemoryCache}
      ) => {
        const data = {
          networkStatus: {
            __typename: 'NetworkStatus',
            isConnected
          },
        };
        cache.writeData({ data });

        return data;
      },
      ...authResolvers,
      ...restMgmtStateResolvers.mutations
    },
    Query: {
      ...restMgmtStateResolvers.queries
    }
  },
  defaults: defaults
});

const httpLink = new HttpLink({uri: `${process.env.REACT_APP_API_URL}/graphql`});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  const authorizationHeader = token ? `Bearer ${token}` : null;

  if (authorizationHeader) {
    operation.setContext({
      headers: {
        authorization: authorizationHeader
      }
    });
  }

  if (forward) {
    return forward(operation);
  }

  return null;
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    middlewareAuthLink,
    httpLink
  ]),
  cache: memCache
});

export const AppApolloClient = ({children}) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);
