import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { AuthView } from './modules/auth/views/AuthView';
import { NoMatchView } from './modules/noMatch/views/NoMatchView';
import { AssigmentsData } from './modules/student/models';
import { StudentAssignmentsView } from './modules/student/views/StudentAssignmentsView';
import { StudentLessons } from './modules/studentLessons/views/StudentLessons';
import { TeacherAssignmentsView } from './modules/teacher/views/TeacherAssignmentsView';
import { TeacherLessons } from './modules/teacherLessons/views/TeacherLessons';
import { useAppSelector } from './store';
import { selectIsLoggedIn, selectUserType } from './store/slices/auth';

type Props = {
  assignmentsData: AssigmentsData[];
};

export const AppRoutes = ({ assignmentsData }: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userType = useAppSelector(selectUserType);

  const location = useLocation();

  const TEACHER_ROUTES = ['/teacher/assignments', '/teacher/lessons'];
  const STUDENT_ROUTES = ['/student/assignments'];

  const getHomeRouteByUserType = (type: string, isLogged: boolean) => {
    if (!isLogged) return <Navigate to="/auth" />;

    if (type === 'teacher') {
      return <Navigate to="/teacher/assignments" />;
    }
    return <Navigate to="/student/assignments" />;
  };

  const authRoute = isLoggedIn ? (
    <Navigate to={`/${userType}/assignments`} />
  ) : (
    <AuthView />
  );

  return (
    <>
      {userType === 'teacher' &&
        TEACHER_ROUTES.some((route) => location.pathname === route) && (
          <Header />
        )}
      {userType === 'student' &&
        STUDENT_ROUTES.some((route) => location.pathname === route) && (
          <Header />
        )}
      <Routes>
        <Route
          path="/"
          element={getHomeRouteByUserType(userType, isLoggedIn)}
        />
        <Route path="/auth" element={authRoute} />
        {userType === 'student' && (
          <>
            <Route
              path="/student/assignments"
              element={
                <StudentAssignmentsView assignmentsData={assignmentsData} />
              }
            />
            <Route path="/student/lessons" element={<StudentLessons />} />
          </>
        )}
        {userType === 'teacher' && (
          <>
            <Route
              path="/teacher/assignments"
              element={
                <TeacherAssignmentsView assignmentsData={assignmentsData} />
              }
            />
            <Route path="/teacher/lessons" element={<TeacherLessons />} />
          </>
        )}
        <Route path="*" element={<NoMatchView />} />
      </Routes>
    </>
  );
};
