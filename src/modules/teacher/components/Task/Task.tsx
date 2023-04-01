import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  StockOutlined,
} from '@ant-design/icons';
import { List, Spin } from 'antd';
import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch } from '../../../../store';
import {
  createOpenAssignmentsIds,
  deleteOpenAssignmentsIds,
} from '../../../../store/slices/assignments';
import { AssignmentsData } from '../../models';
import s from './Task.module.css';

type Props = {
  item: AssignmentsData;
  index: number;
  openAssignmentsIds: number[];
};

export const Task = ({ item, index, openAssignmentsIds }: Props) => {
  const dispatch = useAppDispatch();

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
  }, [isMatchIds]);

  const handleClickViewTask = async (id: number) => {
    setIsLoading(true);
    if (isViewTask) {
      dispatch(deleteOpenAssignmentsIds(id)).finally(() => {
        setIsLoading(false);
        setIsViewTask(false);
      });
    } else {
      dispatch(createOpenAssignmentsIds(id)).finally(() => {
        setIsLoading(false);
        setIsViewTask(true);
      });
    }
  };

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <List.Item className={s.item} key={item.id}>
        <div className={s.itemWrapper}>
          <List.Item.Meta
            title={
              <div className={s.link}>
                {index + 1}. {item.name}
              </div>
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
