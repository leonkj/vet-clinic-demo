import gql from 'graphql-tag';

export const ALL_CLINICS_QUERY = gql`
  {
    clinics {
      id
      name
    }
  }
`;
