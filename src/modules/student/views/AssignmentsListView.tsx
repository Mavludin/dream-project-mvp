import { useEffect, useState } from 'react';
import { List } from 'antd';
import { AssigmentListFilters } from '../components/AssigmentsListFilters/AssigmentListFilters';
import { Header } from '../../../components/Header/Header';
import { AssigmentsData, StudentStat } from '../models';
import styles from './AssignmentsListView.module.css';
import { AssignmentsListItem } from '../components/AssignmentsListItem/AssignmentsListItem';
import { useAppSelector } from '../../../store';
import { selectStudentId } from '../../../store/slices/userData';

type Props = {
  assignmentsData: AssigmentsData[];
};

export const AssignmentsListView = ({ assignmentsData }: Props) => {
  const [openAssignments, setOpenAssignments] = useState<AssigmentsData[]>([]);
  const [filteredData, setFilteredData] = useState<AssigmentsData[]>([]);
  const [openAssignmentsIds, setOpenAssignmentsIds] = useState<number[]>([]);
  const [studentStat, setStudentStat] = useState<StudentStat>();

  const finalData = filteredData.length ? filteredData : openAssignments;

  const studentId = useAppSelector(selectStudentId);

  useEffect(() => {
    fetch('/api/open-assignments')
      .then((res) => res.json())
      .then((res) => setOpenAssignmentsIds(res.data));
  }, []);

  useEffect(() => {
    fetch(`/api/student-stats/${studentId}`)
      .then((res) => res.json())
      .then((res) => setStudentStat(res.data));
  }, [studentId]);

  useEffect(() => {
    const openAssignmentsData = assignmentsData.filter((item) =>
      openAssignmentsIds.some((id) => id === item.id),
    );
    setOpenAssignments(openAssignmentsData);
  }, [assignmentsData, openAssignmentsIds]);

  return (
    <>
      <Header />
      <div className={styles.assignList}>
        <div className={styles.title}>
          <h1>Список задач</h1>
          <AssigmentListFilters
            completedAssignments={studentStat?.completedAssignments}
            openAssignments={openAssignments}
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
            <AssignmentsListItem
              item={item}
              index={index}
              studentStat={studentStat}
            />
          )}
        />
      </div>
    </>
  );
};
