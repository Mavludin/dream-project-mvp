import styles from './TaskButtons.module.css';

export const TaskButtons = () => (
  <div className={styles.codeFooter}>
    <button className={styles.run}>Run</button>
    <button className={styles.submit}>Submit</button>
  </div>
);
