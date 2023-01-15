import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './TaskView.module.css';
import { TaskDescription } from '../components/TaskDescription/TaskDescription';
import { TaskEditor } from '../components/TaskEditor/TaskEditor';
import { TaskLogs } from '../components/TaskLogs/TaskLogs';
import { TaskButtons } from '../components/TaskButtons/TaskButtons';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  fetchAssignments,
  selectAssignmentsData,
} from '../../../store/slices/assignments';
import { NoMatchView } from '../../noMatch/views/NoMatchView';

export const TaskView = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const { assignmentsData } = useAppSelector(selectAssignmentsData);

  const assignmentsRoutes = assignmentsData.map(
    (student) => `/student/assignments/${student.id}`,
  );
  const isRouteExists = useMemo(
    () => assignmentsRoutes.some((route) => location.pathname === route),
    [location.pathname, assignmentsRoutes],
  );

  useEffect(() => {
    if (assignmentsData.length) return;

    dispatch(fetchAssignments());
  }, [dispatch, assignmentsData]);

  if (!assignmentsData.length) return null;

  return isRouteExists ? (
    <div className={styles.taskPage}>
      <TaskDescription />
      <div className={`${styles.resizer} ${styles.vertical}`} />
      <div className={styles.codeWrapper}>
        <TaskEditor />
        <div className={`${styles.resizer} ${styles.horizontal}`} />
        <TaskLogs />
        <div className={`${styles.resizer} ${styles.horizontal}`} />
        <TaskButtons />
      </div>
    </div>
  ) : (
    <NoMatchView />
  );
};
