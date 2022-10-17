import { Document } from '@contentful/rich-text-types';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type Type = 'css' | 'html' | 'js' | 'react';

export type Examples = {
  input: string;
  output: string;
};

export type AssignmentsData = {
  id: number;
  name: string;
  description: string;
  difficulty: Difficulty;
  examples: Examples[];
};

type FilterItemChildren = {
  id: number;
  name: string;
  type?: Difficulty | Type;
};

export type FilterItem = {
  id: number;
  name: string;
  children?: FilterItemChildren[];
};

export const FILTER_METHODS: FilterItem[] = [
  {
    id: 1,
    name: 'по завершенности',
  },
  {
    id: 2,
    name: 'по сложности',
    children: [
      {
        id: 1,
        name: 'показать легкие',
        type: 'easy',
      },
      {
        id: 2,
        name: 'показать средние',
        type: 'medium',
      },
      {
        id: 3,
        name: 'показать сложные',
        type: 'hard',
      },
    ],
  },
  {
    id: 3,
    name: 'по дедлайну',
  },
];

export interface GraphqlSysData {
  id: string;
  publishedAt?: string;
}

export type LessonItem = {
  sys: GraphqlSysData;
  title: string;
  type: string;
  description: { json: Document };
  shortDescription: string;
};

export type FetchLessonsCollectionRequest = void;
export type FetchLessonsCollectionResponse = {
  items: LessonItem[];
};
