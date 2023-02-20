import { useMemo } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { getHomeRouteByUserType } from './helpers/getHomeRouteByUserType';
import { AuthView } from './modules/auth/views/AuthView';
import { NoMatchView } from './modules/noMatch/views/NoMatchView';
import { StudentAssignmentsView } from './modules/student/views/StudentAssignmentsView';
import { TaskView } from './modules/student/views/TaskView';
import { StudentLessonView } from './modules/studentLessons/views/StudentLessonView';
import { StudentLessons } from './modules/studentLessons/views/StudentLessons';
import { TeacherAssignmentsView } from './modules/teacher/views/TeacherAssignmentsView';
import { TeacherLessonView } from './modules/teacherLessons/views/TeacherLessonView';
import { TeacherLessons } from './modules/teacherLessons/views/TeacherLessons';
import { useAppSelector } from './store';
import { selectIsLoggedIn, selectUserType } from './store/slices/auth';
import { selectLessonsCollection } from './store/slices/lessons';

// const TEACHER_ROUTES = ['/teacher/assignments', '/teacher/lessons'];
// const STUDENT_ROUTES = ['/student/assignments', '/student/lessons'];

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userType = useAppSelector(selectUserType);

  console.log(userType);

  // const lessonsCollection = useAppSelector(selectLessonsCollection);

  // const location = useLocation();

  const AUTH_ROUTE = isLoggedIn ? (
    <Navigate to={`/${userType}/assignments`} />
  ) : (
    <AuthView />
  );

  // const isTeacherRoute = useMemo(
  //   () => TEACHER_ROUTES.some((route) => location.pathname === route),
  //   [location.pathname],
  // );
  // const isStudentRoute = useMemo(
  //   () => STUDENT_ROUTES.some((route) => location.pathname === route),
  //   [location.pathname],
  // );

  // const lessonsRoutes = lessonsCollection.map(
  //   (item) => `/${userType}/lessons/${item.sys.id}`,
  // );

  // const isLessonPage = useMemo(
  //   () => lessonsRoutes.some((route) => location.pathname === route),
  //   [location.pathname, lessonsRoutes],
  // );

  return (
    <>
      {/* {(userType === 'student' || userType === 'teacher') &&
        (isStudentRoute || isTeacherRoute || isLessonPage) && <Header />} */}

      {isLoggedIn && <Header />}

      <Routes>
        <Route
          path="/"
          // element={getHomeRouteByUserType(userType, isLoggedIn)}
          element={AUTH_ROUTE}
        />
        <Route path="/auth" element={AUTH_ROUTE} />
        {userType === 'student' && (
          <>
            <Route
              path="/student/assignments"
              element={<StudentAssignmentsView />}
            />
            <Route
              path="/student/assignments/:asgmtId"
              element={<TaskView />}
            />
            <Route path="/student/lessons" element={<StudentLessons />} />
            <Route
              path="/student/lessons/:lessonId"
              element={<StudentLessonView />}
            />
          </>
        )}
        {userType === 'teacher' && (
          <>
            <Route
              path="/teacher/assignments"
              element={<TeacherAssignmentsView />}
            />
            <Route path="/teacher/lessons" element={<TeacherLessons />} />
            <Route
              path="/teacher/lessons/:lessonId"
              element={<TeacherLessonView />}
            />
          </>
        )}
        {/* {(isTeacherRoute || isStudentRoute) && (
          <Route path={location.pathname} element={<Navigate to="/auth" />} />
        )} */}
        <Route path="*" element={<NoMatchView />} />
      </Routes>
    </>
  );
};
