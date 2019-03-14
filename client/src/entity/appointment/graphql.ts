import gql from 'graphql-tag';

export const ALL_APPOINTMENTS_QUERY = gql`
  query getAppointments($input: AppointmentsFilter!) {
    appointments(filter: $input) {
      id
      client {
        id
      }
      doctor {
        id
      }
      start
      end
      services {
        id
      }
    }
  }
`;

export const GET_APPOINTMENT_QUERY = gql`
  query getAppointments($input: Identifier!) {
    appointment(filter: $input) {
      id
      client {
        id
      }
      doctor {
        id
      }
      start
      end
      services {
        id
      }
    }
  }
`;

export const CREATE_APPOINTMENT_MUTATION = gql`
  mutation createAppointment($input: CreateAppointmentInput!) {
    CreateAppointment(input: $input) {
      mutatedId
    }
  }
`;

export const UPDATE_APPOINTMENT_MUTATION = gql`
  mutation updateAppointment($input: UpdateAppointmentInput!) {
    UpdateAppointment(input: $input) {
      mutatedId
    }
  }
`;
