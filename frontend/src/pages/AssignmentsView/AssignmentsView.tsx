import {
  FilterOutlined,
  BarChartOutlined,
  StockOutlined,
} from '@ant-design/icons';
import { List, Space } from 'antd';
import React, { useState } from 'react';
import { AssigmentsData, Difficulty } from '../../App';
import styles from './AssignmentsView.module.css';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

type Props = {
  assignmentsData: AssigmentsData[];
};

type ItemChildren = {
  id: number;
  name: string;
  type: Difficulty;
};

type ListItem = {
  id: number;
  name: string;
  children?: ItemChildren[];
};

const list: ListItem[] = [
  {
    id: 1,
    name: 'по завершенности',
  },
  {
    id: 2,
    name: 'по сложности',
    children: [
      {
        id: 1,
        name: 'показать легкие',
        type: 'easy',
      },
      {
        id: 2,
        name: 'показать средние',
        type: 'medium',
      },
      {
        id: 3,
        name: 'показать сложные',
        type: 'hard',
      },
    ],
  },
  {
    id: 3,
    name: 'по дедлайну',
  },
];

export const AssignmentsView = ({ assignmentsData }: Props) => {
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
            {list.map((item) => (
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
        // footer={
        //   <div>
        //     <b>ant design</b> footer part
        //   </div>
        // }
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
              //   <IconText
              //     icon={LikeOutlined}
              //     text="156"
              //     key="list-vertical-like-o"
              //   />,
              //   <IconText
              //     icon={MessageOutlined}
              //     text="2"
              //     key="list-vertical-message"
              //   />,
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
