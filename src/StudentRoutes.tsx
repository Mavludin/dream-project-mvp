import { Route } from 'react-router-dom';
import { StudentAssignmentsView } from './modules/student/views/StudentAssignmentsView';
import { StudentLessons } from './modules/studentLessons/views/StudentLessons';
import { StudentLessonView } from './modules/studentLessons/views/StudentLessonView';

export const StudentRoutes = () => (
  <>
    <Route path="/student/assignments" element={<StudentAssignmentsView />} />
    <Route path="/student/lessons" element={<StudentLessons />} />
    <Route path="/student/lessons/:lessonId" element={<StudentLessonView />} />
  </>
);
