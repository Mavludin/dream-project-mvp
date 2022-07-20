export type Type = 'css' | 'html' | 'js' | 'react';

type FilterItemChildren = {
  id: number;
  name: string;
  type?: Type;
};

type FilterItem = {
  id: number;
  name: string;
  children?: FilterItemChildren[];
};

export const FILTER_METHODS: FilterItem[] = [
  {
    id: 1,
    name: 'Показать все',
  },
  {
    id: 2,
    name: 'по завершенности',
    children: [
      {
        id: 1,
        name: 'показать завершенные',
      },
      {
        id: 2,
        name: 'показать незавершенные',
      },
    ],
  },
  {
    id: 3,
    name: 'по тематике',
    children: [
      {
        id: 1,
        name: 'HTML',
        type: 'html',
      },
      {
        id: 2,
        name: 'CSS',
        type: 'css',
      },
      {
        id: 3,
        name: 'JavaScript',
        type: 'js',
      },
      {
        id: 4,
        name: 'React',
        type: 'react',
      },
    ],
  },
];
