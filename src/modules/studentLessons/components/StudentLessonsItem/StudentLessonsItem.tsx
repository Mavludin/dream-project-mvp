import { Card, List } from 'antd';
import {
  CheckOutlined,
  EllipsisOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { LessonItem } from '../../../../models';
import s from './StudentLessonsItem.module.css';
import { getLessonImageByType } from '../../../../helpers/getLessonImageByType';

type Props = {
  item: LessonItem;
  readLessons: string[];
};

export const StudentLessonsItem = ({ item, readLessons }: Props) => {
  const isReading = readLessons.some((id) => item.sys.id === id);

  return (
    <List.Item>
      <Card
        className={isReading ? s.complete : ''}
        bodyStyle={{
          lineHeight: '15px',
          marginBottom: '5px',
          height: '84px',
        }}
        size="small"
        actions={[
          isReading ? (
            <CheckOutlined style={{ fontSize: '24px', color: '#58B588' }} />
          ) : (
            <MinusOutlined className={s.minus} />
          ),
          <EllipsisOutlined
            style={{
              fontSize: '24px',
              color: isReading ? '#58B588' : '',
            }}
            key="ellipsis"
          />,
        ]}
      >
        <div className={s.info}>
          <img src={getLessonImageByType(item.type)} alt="lesson icon" />
          <Meta title={item.title} description={item.shortDescription} />
        </div>
      </Card>
    </List.Item>
  );
};
