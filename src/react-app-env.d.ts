/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    // types of envs
    REACT_APP_CONTENTFUL_API_KEY: string;
    REACT_APP_API_URL: string;
  }
}
