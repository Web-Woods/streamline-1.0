import { gql } from "@apollo/client";

export const REQUESTS_QUERY = gql`
query GetRequests($page: Int, $pageSize: Int){
  getRequestsWithUser(page: $page, pageSize: $pageSize) {
    data {
      id
      createdAt
      updatedAt
      requestType
      description
      file {
        id
        name
      }
      requestedUser {
        id
        name
        email
        role {
          name
          division
        }
      }
      requestedUserId
      requestItems {
        id
        name
        price
        quantity
        sku
        type
        unit
        properties {
          key
          value
        }
      }
      status
    }
    totalPages
  }
}
`;

export const SEARCH_REQUEST_ITEMS = gql`
  query SearchRequestItems($page: Int, $pageSize: Int, $searchString: String!){
    searchRequestItems(page: $page, pageSize: $pageSize, searchString: $searchString) {
      data {
        id
        name
        sku
        quantity
        type
        unit
        price
        properties {
          key
          value
        }
      }
    }
  }
`;
