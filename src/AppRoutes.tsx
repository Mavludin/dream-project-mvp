import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthView } from './modules/auth/views/AuthView';
import { NoMatchView } from './modules/noMatch/views/NoMatchView';
import { AssigmentsData } from './modules/student/models';
import { AssignmentsListView } from './modules/student/views/AssignmentsListView';
import { selectIsLoggedIn } from './store/slices/auth';

type Props = {
  assignmentsData: AssigmentsData[];
};

export const AppRoutes = ({ assignmentsData }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
          isLoggedIn ? (
            <AssignmentsListView assignmentsData={assignmentsData} />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route path="*" element={<NoMatchView />} />
    </Routes>
  );
};
