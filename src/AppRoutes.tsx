import { useEffect, useMemo } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { getHomeRouteByUserType } from './helpers/getHomeRouteByUserType';
import { AuthView } from './modules/auth/views/AuthView';
import { NoMatchView } from './modules/noMatch/views/NoMatchView';
import { StudentAssignmentsView } from './modules/student/views/StudentAssignmentsView';
import { TaskView } from './modules/student/views/TaskView';
import { StudentLessons } from './modules/studentLessons/views/StudentLessons';
import { TeacherAssignmentsView } from './modules/teacher/views/TeacherAssignmentsView';
import { LessonView } from './modules/teacherLessons/views/LessonView';
import { TeacherLessons } from './modules/teacherLessons/views/TeacherLessons';
import { useAppDispatch, useAppSelector } from './store';
import { lessonsGraphqlApi } from './store/api/lessonsApi';
import {
  fetchAssignments,
  selectAssignmentsData,
} from './store/slices/assignments';
import { selectIsLoggedIn, selectUserType } from './store/slices/auth';
import { selectLessonsCollection } from './store/slices/lessons';

const TEACHER_ROUTES = ['/teacher/assignments', '/teacher/lessons'];
const STUDENT_ROUTES = ['/student/assignments', '/student/lessons'];

export const AppRoutes = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userType = useAppSelector(selectUserType);
  const { assignmentsData } = useAppSelector(selectAssignmentsData);
  const lessonsCollection = useAppSelector(selectLessonsCollection);

  const location = useLocation();

  const [fetchLessonsCollection] =
    lessonsGraphqlApi.useLazyFetchLessonsCollectionQuery();
  useEffect(() => {
    if (lessonsCollection.length) return;

    fetchLessonsCollection();
  }, [fetchLessonsCollection, lessonsCollection]);

  const AUTH_ROUTE = isLoggedIn ? (
    <Navigate to={`/${userType}/assignments`} />
  ) : (
    <AuthView />
  );

  const teacherIdsRoutes = lessonsCollection.map(
    (item) => `/teacher/lessons/${item.sys.id}`,
  );

  const studentIdsRoutes = assignmentsData.map(
    (student) => `/student/assignments/${student.id}`,
  );

  const isTeacherRoute = useMemo(
    () => TEACHER_ROUTES.some((route) => location.pathname === route),
    [location.pathname],
  );
  const isStudentRoute = useMemo(
    () => STUDENT_ROUTES.some((route) => location.pathname === route),
    [location.pathname],
  );
  const isStudentIdsRoute = useMemo(
    () => studentIdsRoutes.some((route) => location.pathname === route),
    [location.pathname, studentIdsRoutes],
  );
  const isTeacherIdsRoute = useMemo(
    () => teacherIdsRoutes.some((route) => location.pathname === route),
    [location.pathname, teacherIdsRoutes],
  );

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  return (
    <>
      {(userType === 'student' || userType === 'teacher') &&
        (isStudentRoute || isTeacherRoute || isTeacherIdsRoute) && <Header />}
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
              element={<StudentAssignmentsView />}
            />
            {isStudentIdsRoute && (
              <Route
                path="/student/assignments/:asgmtId"
                element={<TaskView />}
              />
            )}
            <Route path="/student/lessons" element={<StudentLessons />} />
          </>
        )}
        {userType === 'teacher' && (
          <>
            <Route
              path="/teacher/assignments"
              element={<TeacherAssignmentsView />}
            />
            <Route path="/teacher/lessons" element={<TeacherLessons />} />
            {isTeacherIdsRoute && (
              <Route
                path="/teacher/lessons/:lessonId"
                element={<LessonView />}
              />
            )}
          </>
        )}
        {(isTeacherRoute || isStudentRoute) && (
          <Route path={location.pathname} element={<Navigate to="/auth" />} />
        )}
        <Route path="*" element={<NoMatchView />} />
      </Routes>
    </>
  );
};
