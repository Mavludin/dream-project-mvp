import { useEffect, useState } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { AssignmentListFilters } from '../components/AssignmentsListFilters/AssignmentListFilters';
import styles from './StudentAssignmentsView.module.css';
import { AssignmentsListItem } from '../components/AssignmentsListItem/AssignmentsListItem';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectStudentId } from '../../../store/slices/userData';
import {
  fetchAssignments,
  fetchStudentStat,
  selectAssignmentsData,
} from '../../../store/slices/assignments';

export const StudentAssignmentsView = () => {
  const { assignmentsData, studentStat, completedAssignments } = useAppSelector(
    selectAssignmentsData,
  );
  const [filteredData, setFilteredData] = useState(assignmentsData);

  const finalData = filteredData.length ? filteredData : assignmentsData;

  const studentId = useAppSelector(selectStudentId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAssignments());
  }, [dispatch]);

  useEffect(() => {
    if (!studentId) return;
    dispatch(fetchStudentStat(studentId));
  }, [dispatch, studentId]);

  return (
    <div className={styles.assignList}>
      <div className={styles.title}>
        <h1>Список задач</h1>
        <AssignmentListFilters
          completedAssignments={completedAssignments}
          openAssignments={assignmentsData}
          setFilteredData={setFilteredData}
        />
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
            <AssignmentsListItem
              item={item}
              index={index}
              studentStat={studentStat}
            />
          </Link>
        )}
      />
    </div>
  );
};
