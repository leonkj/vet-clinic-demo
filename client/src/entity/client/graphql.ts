import gql from 'graphql-tag';

export const CLENTS_BY_CLINIC_QUERY = gql`
  query clientsByClinic($clinicId: Identifier!) {
    clients(clinicId: $clinicId) {
      id
      firstName
      lastName
      clinic {
        id
      }
    }
  }
`;
