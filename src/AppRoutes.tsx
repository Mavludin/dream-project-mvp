import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { getHomeRouteByUserType } from './helpers/getHomeRouteByUserType';
import { AuthView } from './modules/auth/views/AuthView';
import { NoMatchView } from './modules/noMatch/views/NoMatchView';
import { AssigmentsData } from './modules/student/models';
import { StudentAssignmentsView } from './modules/student/views/StudentAssignmentsView';
import { TaskView } from './modules/student/views/TaskView';
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

  const AUTH_ROUTE = isLoggedIn ? (
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
        <Route path="/auth" element={AUTH_ROUTE} />
        {userType === 'student' && (
          <>
            <Route
              path="/student/assignments"
              element={
                <StudentAssignmentsView assignmentsData={assignmentsData} />
              }
            />
            <Route
              path="/student/assignments/:asgmtId"
              element={<TaskView />}
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
        {userType || (
          <Route
            path="/student/assignments"
            element={<Navigate to="/auth" />}
          />
        )}
        {userType || (
          <Route
            path="/teacher/assignments"
            element={<Navigate to="/auth" />}
          />
        )}
        <Route path="*" element={<NoMatchView />} />
      </Routes>
    </>
  );
};
