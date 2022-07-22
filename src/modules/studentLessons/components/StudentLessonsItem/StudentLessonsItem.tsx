import { Card, List } from 'antd';
import { EllipsisOutlined, MinusOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { LessonItem } from '../../../../models';
import s from './StudentLessonsItem.module.css';
import { getLessonImageByType } from '../../helpers/getLessonImageByType';

type Props = {
  item: LessonItem;
};

export const StudentLessonsItem = ({ item }: Props) => (
  <List.Item>
    <Card
      bodyStyle={{
        lineHeight: '15px',
        marginBottom: '5px',
        height: '84px',
      }}
      size="small"
      actions={[
        <MinusOutlined className={s.minus} />,
        <EllipsisOutlined style={{ fontSize: '24px' }} key="ellipsis" />,
      ]}
    >
      <div className={s.info}>
        <img src={getLessonImageByType(item.type)} alt="lesson icon" />
        <Meta title={item.title} description={item.shortDescription} />
      </div>
    </Card>
  </List.Item>
);
