import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { AuthView } from './modules/auth/views/AuthView';
import { NoMatchView } from './modules/noMatch/views/NoMatchView';
import { AssigmentsData } from './modules/student/models';
import { StudentAssignmentsView } from './modules/student/views/StudentAssignmentsView';
import { StudentLessons } from './modules/studentLessons/views/StudentLessons';
import { TeacherAssignmentsView } from './modules/teacher/views/TeacherAssignmentsView';
import { TeacherLessons } from './modules/teacherLessons/views/TeacherLessons';
import { selectIsLoggedIn, selectUserType } from './store/slices/auth';

type Props = {
  assignmentsData: AssigmentsData[];
};

export const AppRoutes = ({ assignmentsData }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const userType = useSelector(selectUserType);

  const location = useLocation();

  const teachersRoutes = ['/teacher/assignments', '/teacher/lessons'];
  const studentRoutes = ['/student/assignments'];

  const isTeacherOrStudent =
    (isLoggedIn && userType === 'teacher' && (
      <Navigate to="/teacher/assignments" />
    )) ||
    (isLoggedIn && userType === 'student' && (
      <Navigate to="/student/assignments" />
    ));

  return (
    <>
      {userType === 'teacher' &&
        teachersRoutes.some((route) => location.pathname === route) && (
          <Header />
        )}
      {userType === 'student' &&
        studentRoutes.some((route) => location.pathname === route) && (
          <Header />
        )}
      <Routes>
        <Route
          path="/"
          element={isTeacherOrStudent || <Navigate to="/auth" />}
        />
        <Route path="/auth" element={isTeacherOrStudent || <AuthView />} />
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
