export type Difficulty = 'easy' | 'medium' | 'hard';

export type Examples = {
  input: string;
  output: string;
};

export type AssigmentsData = {
  id: number;
  name: string;
  description: string;
  difficulty: Difficulty;
  examples: Examples[];
};

type FilterItemChildren = {
  id: number;
  name: string;
  type: Difficulty;
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
  },
  {
    id: 3,
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
];
