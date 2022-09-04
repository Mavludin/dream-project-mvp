import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './TaskDescription.module.css';
import arrow from '../../../../assets/image/arrow.svg';
import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  fetchAssignment,
  selectAssignmentsData,
} from '../../../../store/slices/assignments';

export const TaskDescription = () => {
  const { asgmtId } = useParams();
  const { openAssignment, openAssignmentExamples } = useAppSelector(
    selectAssignmentsData,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAssignment(Number(asgmtId)));
  }, [dispatch]);

  return (
    <div className={styles.descriptionWrapper}>
      <div className={styles.arrow}>
        <Link to="/">
          <img src={arrow} alt="" />
          назад
        </Link>
      </div>
      <div className={styles.text}>
        <h2 className={styles.title}>{openAssignment?.name}</h2>
        <div className={styles.description}>{openAssignment?.description}</div>
        <div className={styles.testsWrapper}>
          <div className={styles.testsName}>Тесты</div>
          <div className={styles.tests}>
            {openAssignmentExamples.map((elem) => (
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
