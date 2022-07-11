import { BarChartOutlined, StockOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React, { useMemo } from 'react';
import { AssigmentsData, StudentStat } from '../../models';
import { IconText } from '../IconText';
import styles from './AssignmentsListItem.module.css';

type Props = {
  studentStat?: StudentStat;
  item: AssigmentsData;
  index: number;
};

export const AssignmentsListItem = ({ studentStat, item, index }: Props) => {
  const currentStudentData = useMemo(
    () => studentStat?.completedAssignments.find((stat) => item.id === stat.id),
    [item.id, studentStat?.completedAssignments],
  );
  const mark = currentStudentData ? `${currentStudentData.score}%` : '--';
  const borderColor =
    currentStudentData &&
    (currentStudentData.score > 50 ? '#58B588' : '#AD3030');
  const itemStyle = currentStudentData ? borderColor : '#f0f0f0';
  const textStyle = currentStudentData ? borderColor : '#BABABA';
  return (
    <List.Item
      className={styles.item}
      style={{ border: `1px solid ${itemStyle}` }}
      key={item.id}
      actions={[
        <IconText
          icon={BarChartOutlined}
          text={`Оценка: ${mark}`}
          style={textStyle}
          key="list-vertical-star-o"
        />,
      ]}
    >
      <List.Item.Meta
        title={
          <a href="/">
            {index + 1}.{item.name}
          </a>
        }
      />
      <StockOutlined /> {item.difficulty}
    </List.Item>
  );
};
