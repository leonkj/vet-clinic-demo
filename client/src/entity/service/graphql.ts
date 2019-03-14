import gql from 'graphql-tag';

export const ALL_SERVICES_QUERY = gql`
  {
    services {
      id
      name
    }
  }
`;
