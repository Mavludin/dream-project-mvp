import { Navigate } from 'react-router-dom';
import { getHomeRouteByUserType } from './getHomeRouteByUserType';

test('test getHomeRouteByUserType', () => {
  expect(getHomeRouteByUserType('student' || 'teacher', false)).toStrictEqual(
    <Navigate to="/auth" />,
  );
  expect(getHomeRouteByUserType('student', true)).toStrictEqual(
    <Navigate to="/student/assignments" />,
  );
  expect(getHomeRouteByUserType('teacher', true)).toStrictEqual(
    <Navigate to="/teacher/assignments" />,
  );
});
