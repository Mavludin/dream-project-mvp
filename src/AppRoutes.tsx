import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthView } from './modules/auth/views/AuthView';
import { NoMatchView } from './modules/noMatch/views/NoMatchView';
import { AssigmentsData } from './modules/student/models';
import { AssignmentsListView } from './modules/student/views/AssignmentsListView';
import { AssignmentListTeacherView } from './modules/teacher/views/AssignmentListTeacherView';
import { TeacherLessons } from './modules/teacherLessons/views/TeacherLessons';
import { selectIsLoggedIn, selectUserType } from './store/slices/auth';

type Props = {
  assignmentsData: AssigmentsData[];
};

export const AppRoutes = ({ assignmentsData }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const userType = useSelector(selectUserType);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/student" /> : <Navigate to="/auth" />
        }
      />
      <Route
        path="/auth"
        element={isLoggedIn ? <Navigate to="/student" /> : <AuthView />}
      />
      <Route
        path="/student"
        element={
          (isLoggedIn && userType === 'student' && (
            <AssignmentsListView assignmentsData={assignmentsData} />
          )) ||
          (userType === 'teacher' && <Navigate to="/teacher" />) || (
            <Navigate to="/auth" />
          )
        }
      />
      <Route
        path="/teacher"
        element={
          (isLoggedIn && userType === 'teacher' && (
            <AssignmentListTeacherView assignmentsData={assignmentsData} />
          )) ||
          (userType === 'student' && <Navigate to="/student" />) || (
            <Navigate to="/auth" />
          )
        }
      />
      <Route path="*" element={<NoMatchView />} />
      <Route path="/teacher/lessons" element={<TeacherLessons />} />
    </Routes>
  );
};
