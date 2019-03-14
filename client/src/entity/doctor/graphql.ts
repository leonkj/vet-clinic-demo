import gql from 'graphql-tag';

export const ALL_DOCTORS_QUERY = gql`
  query getDoctors($clinicId: Identifier!) {
    doctors(clinicId: $clinicId) {
      id
      firstName
      lastName
      clinic {
        id
      }
    }
  }
`;
