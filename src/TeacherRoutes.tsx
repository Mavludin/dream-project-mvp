import { Route } from 'react-router-dom';
import { TeacherAssignmentsView } from './modules/teacher/views/TeacherAssignmentsView';
import { TeacherLessons } from './modules/teacherLessons/views/TeacherLessons';
import { TeacherLessonView } from './modules/teacherLessons/views/TeacherLessonView';

export const TeacherRoutes = () => (
  <>
    <Route path="/teacher/assignments" element={<TeacherAssignmentsView />} />
    <Route path="/teacher/lessons" element={<TeacherLessons />} />
    <Route path="/teacher/lessons/:lessonId" element={<TeacherLessonView />} />
  </>
);
