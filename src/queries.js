import gql from "graphql-tag";

export const login = gql`
  mutation login($id: String!, $name: String!, $provider: String!) {
    login(id: $id, name: $name, provider: $provider) {
      id
      name
      provider
    }
  }
`;
