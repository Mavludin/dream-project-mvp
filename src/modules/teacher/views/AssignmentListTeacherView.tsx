import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  StockOutlined,
} from '@ant-design/icons';
import { List } from 'antd';
import { useEffect, useState } from 'react';
import { Header } from '../../../components/Header/Header';
import { AssignmentListTeacherFilters } from '../components/AssignmentListTeacherFilters/AssignmentListTeacherFilters';
import { AssigmentsData } from '../models';
import s from './AssignmentListTeacherView.module.css';

type Props = {
  assignmentsData: AssigmentsData[];
};

export const AssignmentListTeacherView = ({ assignmentsData }: Props) => {
  const [openAssignmentsIds, setOpenAssignmentsIds] = useState([]);
  const [isViewTask, setIsViewTask] = useState(false);

  useEffect(() => {
    fetch('/api/open-assignments')
      .then((res) => res.json())
      .then((res) => setOpenAssignmentsIds(res));
  }, []);

  return (
    <>
      <Header />
      <div className={s.assignListTeacher}>
        <div className={s.title}>
          <h1>Список задач</h1>
          <AssignmentListTeacherFilters />
        </div>

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 5,
          }}
          dataSource={assignmentsData}
          renderItem={(item, index) => (
            <List.Item className={s.item} key={item.id}>
              <div className={s.itemWrapper}>
                <List.Item.Meta
                  title={
                    <a href="/">
                      {index + 1}.{item.name}
                    </a>
                  }
                />
                <StockOutlined /> {item.difficulty}
              </div>
              {isViewTask ? (
                <EyeTwoTone className={s.icon} />
              ) : (
                <EyeInvisibleOutlined className={s.icon} />
              )}
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
