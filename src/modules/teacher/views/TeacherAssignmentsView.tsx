import { List } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  fetchAssignments,
  fetchOpenAssignmentsIds,
  selectAssignmentsData,
} from '../../../store/slices/assignments';
import { AssignmentListTeacherFilters } from '../components/AssignmentListTeacherFilters/AssignmentListTeacherFilters';
import { Task } from '../components/Task/Task';
import s from './TeacherAssignmentsView.module.css';

export const TeacherAssignmentsView = () => {
  const dispatch = useAppDispatch();

  const { assignmentsData, openAssignmentsIds } = useAppSelector(
    selectAssignmentsData,
  );
  const [filteredData, setFilteredData] = useState(assignmentsData);

  const finalData = filteredData.length ? filteredData : assignmentsData;

  useEffect(() => {
    dispatch(fetchAssignments());
    dispatch(fetchOpenAssignmentsIds());
  }, [dispatch]);

  return (
    <div className={s.assignListTeacher}>
      <div className={s.title}>
        <h1>Список задач</h1>
        <AssignmentListTeacherFilters
          assignmentsData={assignmentsData}
          setFilteredData={setFilteredData}
          openAssignmentsIds={openAssignmentsIds}
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
          <Task
            item={item}
            index={index}
            openAssignmentsIds={openAssignmentsIds}
            key={item.id}
          />
        )}
      />
    </div>
  );
};
