import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
        cursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      name
      ownerName
      createdAt
      fullName
      reviewCount
      ratingAverage
      forksCount
      stargazersCount
      description
      language
      ownerAvatarUrl
      url
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($repositoryId: ID!, $orderBy: ReviewOrderBy, $orderDirection: OrderDirection, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      createdAt
      id
      rating
      repositoryId
      text
      user {
        id
        username
      }
    }
  }
`;

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
      user {
        id
        username
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
