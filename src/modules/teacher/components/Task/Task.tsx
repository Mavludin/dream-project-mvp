import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  StockOutlined,
} from '@ant-design/icons';
import { List, Spin } from 'antd';
import { useEffect, useState, useMemo } from 'react';
import { AssigmentsData } from '../../models';
import s from './Task.module.css';

type Props = {
  item: AssigmentsData;
  index: number;
  openAssignmentsIds: number[];
};

export const Task = ({ item, index, openAssignmentsIds }: Props) => {
  const [isViewTask, setIsViewTask] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isMatchIds = useMemo(
    () => openAssignmentsIds.some((id) => id === item.id),
    [openAssignmentsIds, item],
  );

  useEffect(() => {
    if (isMatchIds) {
      setIsViewTask(true);
    }
  }, [isMatchIds, item]);

  const handleClickViewTask = async (id: number) => {
    if (isViewTask) {
      setIsLoading(true);
      const res = await fetch(`/api/open-assignments/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setIsViewTask(false);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      const res = await fetch('/api/open-assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asgmtId: id }),
      });

      if (res.ok) {
        setIsViewTask(true);
        setIsLoading(false);
      }
    }
  };
  return (
    <Spin tip="Loading..." spinning={isLoading}>
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
          <EyeTwoTone
            className={s.icon}
            onClick={() => handleClickViewTask(item.id)}
          />
        ) : (
          <EyeInvisibleOutlined
            className={s.icon}
            onClick={() => handleClickViewTask(item.id)}
          />
        )}
      </List.Item>
    </Spin>
  );
};
