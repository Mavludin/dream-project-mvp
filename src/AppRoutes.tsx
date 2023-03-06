import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthView } from './modules/auth/views/AuthView';
import { NoMatchView } from './modules/noMatch/views/NoMatchView';
import { TaskView } from './modules/student/views/TaskView';
import { useAppSelector } from './store';
import { selectIsLoggedIn, selectUserType } from './store/slices/auth';
import { PageWithHeader } from './components/Header/PageWithHeader';
import { TeacherRoutes } from './TeacherRoutes';
import { StudentRoutes } from './StudentRoutes';

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
          <Route path="/student/assignments/:asgmtId" element={<TaskView />} />
        )}

        <Route path={userType} element={<PageWithHeader />}>
          {userType === 'student' && <StudentRoutes />}
          {userType === 'teacher' && <TeacherRoutes />}
        </Route>

        <Route path="*" element={<NoMatchView />} />
      </Routes>
    </>
  );
};
