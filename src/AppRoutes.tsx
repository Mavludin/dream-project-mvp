import { Navigate, Route, Routes } from 'react-router-dom';
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
import { HeaderPage } from './components/Header/HeaderPage';

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userType = useAppSelector(selectUserType);

  const AUTH_ROUTE = isLoggedIn ? (
    <Navigate to={`/${userType}/assignments`} />
  ) : (
    <AuthView />
  );

  return (
    <>
      <Routes>
        <Route index element={AUTH_ROUTE} />
        <Route path="/auth" element={AUTH_ROUTE} />
        {userType === 'student' && (
          <>
            <Route
              path="/student/assignments/:asgmtId"
              element={<TaskView />}
            />
          </>
        )}

        <Route path={userType} element={<HeaderPage />}>
          {userType === 'student' && (
            <>
              <Route
                path="/student/assignments"
                element={<StudentAssignmentsView />}
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
        </Route>
        <Route path="*" element={<NoMatchView />} />
      </Routes>
    </>
  );
};
