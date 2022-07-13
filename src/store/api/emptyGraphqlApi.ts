import { request, ClientError } from 'graphql-request';
import { DocumentNode } from 'graphql';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import * as Dom from 'graphql-request/dist/types.dom';
import AppConfig from '../../config/AppConfig';

type BaseQuery = {
  variables?: Record<string, string>;
  body: string | DocumentNode;
  key: string;
};

export const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body, variables = {}, key }: BaseQuery) => {
    const headers: Dom.RequestInit['headers'] = {};

    headers.authorization = `Bearer ${AppConfig.contentfulApiKey}`;
    try {
      const result = await request(baseUrl, body, variables, headers);
      return { data: key ? result[key] : result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };

export const emptyGraphqlApi = createApi({
  baseQuery: graphqlBaseQuery({ baseUrl: AppConfig.contentfulUrl }),
  reducerPath: 'graphql',
  endpoints: () => ({}),
});
