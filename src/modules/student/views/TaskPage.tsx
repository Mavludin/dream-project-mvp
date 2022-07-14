import Editor from '@monaco-editor/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './TaskPage.module.css';
import arrow from '../../../assets/image/arrow.svg';

export const TaskPage = () => {
  const [width, setWidth] = useState<string>('50%');

  return (
    <div className={styles.taskPage}>
      <div className={styles.descriptionWrapper} style={{ width }}>
        <div className={styles.arrow}>
          <Link to="/">
            <img src={arrow} alt="" />
            назад
          </Link>
        </div>
        <div className={styles.text}>
          <div className={styles.name}>Сумма двух чисел</div>
          <div className={styles.description}>
            Напишите функцию sum(a, b), которая принимает два числа a и b и
            возвращает их сумму
          </div>
          <div className={styles.testsWrapper}>
            <div className={styles.testsName}>Тесты</div>
            <div className={styles.tests}>
              <div className={styles.test}>
                <div className={styles.input}>Input: 1 2</div>
                <div className={styles.output}>Output: 3</div>
              </div>
              <div className={styles.test}>
                <div className={styles.input}>Input: 5 5</div>
                <div className={styles.output}>Output: 10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.resizer}>1</div>
      <div className={styles.codeWrapper}>
        <div className={styles.code}>
          <Editor
            height="60vh"
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue="// some comment"
          />
        </div>
        {/* <div className={styles.resizer}>1</div> */}
        <div className={styles.logs}>logs</div>
        <div className={styles.codeFooter}>
          <button className={styles.run}>Run</button>
          <button className={styles.submit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
