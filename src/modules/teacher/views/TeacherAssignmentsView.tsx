import { List } from 'antd';
import { useEffect, useState } from 'react';
import AppConfig from '../../../config/AppConfig';
import { AssignmentListTeacherFilters } from '../components/AssignmentListTeacherFilters/AssignmentListTeacherFilters';
import { Task } from '../components/Task/Task';
import { AssigmentsData } from '../models';
import s from './TeacherAssignmentsView.module.css';

type Props = {
  assignmentsData: AssigmentsData[];
};

export const TeacherAssignmentsView = ({ assignmentsData }: Props) => {
  const [openAssignmentsIds, setOpenAssignmentsIds] = useState<number[]>([]);
  const [filteredData, setFilteredData] = useState<AssigmentsData[]>([]);

  const finalData = filteredData.length ? filteredData : assignmentsData;

  useEffect(() => {
    fetch(`${AppConfig.apiUrl}/api/open-assignments`)
      .then((res) => res.json())
      .then((res) => setOpenAssignmentsIds(res.data));
  }, []);

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
