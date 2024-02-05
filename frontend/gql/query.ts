import { gql } from "@apollo/client";

export const USER_QUERY = gql`
query User($id: String!) {
  user(id: $id) {
    id
    createdAt
    updatedAt
    username
    email
    password
    name
    role {
      id
      name
      division
    }
    verified
  }
}
`;

export const USER_BY_USERNAME_OR_EMAIL_QUERY = gql`
query UserByUsernameOrEmail($username: String, $email: String) {
  userByUsernameOrEmail(
    username: $username, 
    email: $email
  ) {
    id
    username
    email
    name
    role {
      name
      division
    }
    verified
  }
}
`;

export const REQUESTS_QUERY = gql`
query GetRequests($page: Int, $pageSize: Int){
  getRequestsWithUser(page: $page, pageSize: $pageSize) {
    data {
      id
      createdAt
      updatedAt
      requestType
      subject
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
        qty
        storeItem {
          id
          name
          price
          properties {
            key
            value
          }
          sku
          stock
          unit
        }
      }
      status
    }
    totalItems
  }
}
`;

export const SEARCH_STORE_ITEMS = gql`
  query SearchStoreItems($page: Int, $pageSize: Int, $searchString: String!){
    searchStoreItems(page: $page, pageSize: $pageSize, searchString: $searchString) {
      data {
        id
        createdAt
        updatedAt
        name
        sku
        stock
        type
        unit
        price
        properties {
          id
          key
          value
          type
        }
      }
    }
  }
`;

export const REQUEST_QUERY = gql`
{
  requests(page: 1, pageSize: 10) {
    data {
      id
      createdAt
      requestType
      requestedUser{
        name
      }
      file{
        name
      }
      status
    }
    totalPages
  }
}
`;


export const PURCHASE_ORDER_QUERY = gql`
query GetPurchaseOrders($page: Int, $pageSize: Int){
  getPurchaseOrders(page: $page, pageSize: $pageSize) {
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
    totalItems
  }
}
`;