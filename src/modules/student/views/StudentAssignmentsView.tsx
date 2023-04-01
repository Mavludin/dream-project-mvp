import { useEffect, useState } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { AssignmentListFilters } from '../components/AssignmentsListFilters/AssignmentListFilters';
import styles from './StudentAssignmentsView.module.css';
import { AssignmentsListItem } from '../components/AssignmentsListItem/AssignmentsListItem';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectUserId } from '../../../store/slices/userData';
import {
  fetchAssignments,
  fetchStudentStat,
  selectAssignmentsData,
} from '../../../store/slices/assignments';

export const StudentAssignmentsView = () => {
  const dispatch = useAppDispatch();

  const { assignmentsData } = useAppSelector(selectAssignmentsData);

  const [filteredData, setFilteredData] = useState(assignmentsData);

  const userId = useAppSelector(selectUserId);

  const finalData = filteredData.length ? filteredData : assignmentsData;

  useEffect(() => {
    if (assignmentsData.length) return;

    dispatch(fetchAssignments());
  }, [assignmentsData.length, dispatch]);

  useEffect(() => {
    if (!userId) return;

    dispatch(fetchStudentStat(userId));
  }, [dispatch, userId]);

  return (
    <div className={styles.assignList}>
      <div className={styles.title}>
        <h1>Список задач</h1>
        <AssignmentListFilters setFilteredData={setFilteredData} />
      </div>

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={finalData}
        renderItem={(item, index) => (
          <Link to={`/student/assignments/${item.id}`}>
            <AssignmentsListItem item={item} index={index} />
          </Link>
        )}
      />
    </div>
  );
};
