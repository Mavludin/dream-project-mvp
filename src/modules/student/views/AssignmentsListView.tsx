import {
  FilterOutlined,
  BarChartOutlined,
  StockOutlined,
} from '@ant-design/icons';
import { List, Space } from 'antd';
import React, { useState } from 'react';
import { AssigmentsData, Difficulty, FILTER_METHODS } from '../models';
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

  const filterDifficulty = (difficulty: Difficulty) => {
    const easy = assignmentsData.filter(
      (item) => item.difficulty === difficulty,
    );

    setFilteredData(easy);
  };

  const resetFilterList = () => setFilteredData([]);

  const finalData = filteredData.length ? filteredData : assignmentsData;

  return (
    <div className={styles.assignList}>
      <div className={styles.title}>
        <h1>Список задач</h1>
        <div className={styles.filter}>
          <FilterOutlined />
          <ul>
            <li>
              <button onClick={resetFilterList}>Показать все</button>
            </li>
            {FILTER_METHODS.map((item) => (
              <>
                <li key={item.id}>
                  <button>{item.name}</button>
                </li>
                {item.children && (
                  <ul className={styles.subMenu}>
                    {item.children.map((childItem) => (
                      <li>
                        <button
                          onClick={() => filterDifficulty(childItem.type)}
                        >
                          {childItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
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
              title={(
                <a href="/">
                  {index + 1}
                  .
                  {item.name}
                </a>
              )}
            />
            <StockOutlined />
            {' '}
            {item.difficulty}
          </List.Item>
        )}
      />
    </div>
  );
};
