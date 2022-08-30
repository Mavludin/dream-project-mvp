import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './TaskDescription.module.css';
import arrow from '../../../../assets/image/arrow.svg';
import { AssigmentsData } from '../../models';
import AppConfig from '../../../../config/AppConfig';

export const TaskDescription = () => {
  const { asgmtId } = useParams();

  const [assigment, setAssigment] = useState<AssigmentsData>();

  useEffect(() => {
    if (asgmtId) {
      fetch(`${AppConfig.apiUrl}/api/assignments/${asgmtId}`)
        .then((res) => res.json())
        .then((res) => setAssigment(res.data));
    }
  }, [asgmtId]);

  return (
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
  );
};
