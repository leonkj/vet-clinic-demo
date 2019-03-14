import ApolloClient from 'apollo-boost';

export const graphqlClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT_URL,
});
