import { gql } from 'graphql-request';
import {
  FetchLessonRequest,
  FetchLessonResponse,
  FetchLessonsCollectionRequest,
  FetchLessonsCollectionResponse,
} from '../../models';
import { emptyGraphqlApi } from './emptyGraphqlApi';

export const lessonsGraphqlApi = emptyGraphqlApi.injectEndpoints({
  endpoints: (build) => ({
    fetchLessonsCollection: build.query<
      FetchLessonsCollectionResponse,
      FetchLessonsCollectionRequest
    >({
      query: () => ({
        body: FETCH_LESSONS_COLLECTION_QUERY,
        key: 'lessonsCollection',
      }),
    }),
    fetchLessons: build.query<FetchLessonResponse, FetchLessonRequest>({
      query: ({ lessonId }) => ({
        body: FETCH_LESSONS_QUERY,
        key: 'lessons',
        variables: { lessonId },
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

export const FETCH_LESSONS_QUERY = gql`
  query fetchLessons($lessonId: String!) {
    lessons(id: $lessonId) {
      title
      description {
        json
      }
    }
  }
`;
