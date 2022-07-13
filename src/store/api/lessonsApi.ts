import { gql } from 'graphql-request';
import {
  FetchLessonsCollectionRequest,
  FetchLessonsCollectionResponse,
} from '../../models';
import { emptyGraphqlApi } from './emptyGraphqlApi';

export const lessonsGraphqlApi = emptyGraphqlApi.injectEndpoints({
  endpoints: (build) => ({
    fetchLessons: build.query<
      FetchLessonsCollectionResponse,
      FetchLessonsCollectionRequest
    >({
      query: () => ({
        body: FETCH_LESSONS_COLLECTION_QUERY,
        key: 'lessonsCollection',
      }),
    }),
  }),
  overrideExisting: false,
});

export const FETCH_LESSONS_COLLECTION_QUERY = gql`
  query {
    lessonsCollection {
      items {
        sys {
          id
        }
        title
        type
        shortDescription
        description {
          json
        }
      }
    }
  }
`;
