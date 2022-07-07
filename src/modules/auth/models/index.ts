export type UserTypes = 'student' | 'teacher';
type UserNames = 'Ученик' | 'Преподаватель';

export type UserRole = { name: UserNames; type: UserTypes };

export type UsersData = {
  birthDate: string;
  course: string;
  email: string;
  firstName: string;
  gender: string;
  id: number;
  lastName: string;
  password: string;
  type: UserTypes;
  userName: string;
};

export const USER_TYPE_LIST: UserRole[] = [
  { name: 'Ученик', type: 'student' },
  { name: 'Преподаватель', type: 'teacher' },
];
