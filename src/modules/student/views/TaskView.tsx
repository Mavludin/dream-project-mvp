import styles from './TaskView.module.css';
import { TaskDescription } from '../components/TaskDescription/TaskDescription';
import { TaskEditor } from '../components/TaskEditor/TaskEditor';
import { TaskLogs } from '../components/TaskLogs/TaskLogs';
import { TaskButtons } from '../components/TaskButtons/TaskButtons';

export const TaskView = () => (
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
);
