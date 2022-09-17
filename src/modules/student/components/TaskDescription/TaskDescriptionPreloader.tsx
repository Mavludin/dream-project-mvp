import { Skeleton } from 'antd';
import styles from './TaskDescription.module.css';

type Props = {
  isLoading: boolean;
  children: JSX.Element;
};
export const TaskDescriptionPreloader = ({ isLoading, children }: Props) => {
  if (isLoading)
    return (
      <div className={styles.text}>
        <Skeleton
          className={styles.title}
          paragraph={{ rows: 5 }}
          active={isLoading}
        />
        <div className={styles.testsWrapper}>
          <div className={styles.testsName}>Тесты</div>
          <div className={styles.tests}>
            <Skeleton
              className={styles.test}
              paragraph={{ rows: 2 }}
              active={isLoading}
              title={false}
            />
            <Skeleton
              className={styles.test}
              paragraph={{ rows: 2 }}
              active={isLoading}
              title={false}
            />
          </div>
        </div>
      </div>
    );
  return children;
};
