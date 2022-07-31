import { Navigate } from 'react-router-dom';

export const getHomeRouteByUserType = (
  userType: string,
  isLoggedIn: boolean,
) => {
  if (!isLoggedIn) return <Navigate to="/auth" />;

  if (userType === 'teacher') {
    return <Navigate to="/teacher/assignments" />;
  }
  return <Navigate to="/student/assignments" />;
};
