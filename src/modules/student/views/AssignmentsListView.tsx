import { BarChartOutlined, StockOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
import React, { useState } from 'react';
import { AssigmentListFilters } from '../components/AssigmentsListFilters/AssigmentListFilters';
import { AssigmentsData } from '../models';
import styles from './AssignmentsListView.module.css';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

type Props = {
  assignmentsData: AssigmentsData[];
};

export const AssignmentsListView = ({ assignmentsData }: Props) => {
  const [filteredData, setFilteredData] = useState<AssigmentsData[]>([]);

  const finalData = filteredData.length ? filteredData : assignmentsData;

  return (
    <div className={styles.assignList}>
      <div className={styles.title}>
        <h1>Список задач</h1>
        <AssigmentListFilters
          assignmentsData={assignmentsData}
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
          <List.Item
            className={styles.item}
            key={item.id}
            actions={[
              <IconText
                icon={BarChartOutlined}
                text="Оценка: --"
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
        )}
      />
    </div>
  );
};
