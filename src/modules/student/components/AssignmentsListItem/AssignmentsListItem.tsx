import { BarChartOutlined, StockOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { useMemo } from 'react';
import { useAppSelector } from '../../../../store';
import { selectAssignmentsData } from '../../../../store/slices/assignments';
import { AssignmentsData } from '../../models';
import { IconText } from '../IconText';
import styles from './AssignmentsListItem.module.css';

type Props = {
  item: AssignmentsData;
  index: number;
};

export const AssignmentsListItem = ({ item, index }: Props) => {
  const { completedAssignments } = useAppSelector(selectAssignmentsData);
  const currentStudentData = useMemo(
    () => completedAssignments.find((stat) => item.id === stat.id),
    [item.id, completedAssignments],
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
          <div className={styles.link}>
            {index + 1}. {item.name}
          </div>
        }
      />
      <StockOutlined /> {item.difficulty}
    </List.Item>
  );
};
