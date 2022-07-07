export enum UserTypes {
    Student = 'student',
    Teacher = 'teacher'
}

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
