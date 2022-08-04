import Editor from '@monaco-editor/react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './TaskView.module.css';
import arrow from '../../../assets/image/arrow.svg';
import { AssigmentsData } from '../models';

export const TaskView = () => {
  const { asgmtId } = useParams();

  const [assigment, setAssigment] = useState<AssigmentsData>();

  useEffect(() => {
    if (asgmtId) {
      fetch(`/api/assignments`)
        .then((res) => res.json())
        .then((res) =>
          setAssigment(
            res.data.filter((item: AssigmentsData) => item.id === +asgmtId)[0],
          ),
        );
    }
  }, [asgmtId]);
  return (
    <div className={styles.taskPage}>
      <div className={styles.descriptionWrapper}>
        <div className={styles.arrow}>
          <Link to="/">
            <img src={arrow} alt="" />
            назад
          </Link>
        </div>
        <div className={styles.text}>
          <h2 className={styles.title}>{assigment?.name}</h2>
          <div className={styles.description}>{assigment?.description}</div>
          <div className={styles.testsWrapper}>
            <div className={styles.testsName}>Тесты</div>
            <div className={styles.tests}>
              {assigment?.examples?.map((elem) => (
                <div className={styles.test} key={elem.input + elem.output}>
                  <div className={styles.input}>
                    <span>Input:</span> {elem.input}
                  </div>
                  <div className={styles.output}>
                    <span>Output:</span> {elem.output}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.resizer} ${styles.vertical}`} />
      <div className={styles.codeWrapper}>
        <div className={styles.code}>
          <Editor
            height="60vh"
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue="// some comment"
          />
        </div>
        <div className={`${styles.resizer} ${styles.horizontal}`} />
        <div className={styles.logs}>logs</div>
        <div className={`${styles.resizer} ${styles.horizontal}`} />
        <div className={styles.codeFooter}>
          <button className={styles.run}>Run</button>
          <button className={styles.submit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
