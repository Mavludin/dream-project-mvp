import { DashOutlined, EyeOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { LessonItem } from '../../../models';
import s from './TeacherLessonsItem.module.css';
import { getLessonImageByType } from '../helpers/getLessonImageByType';

type Props = {
  item: LessonItem;
};

export const TeacherLessonsItem = ({ item }: Props) => (
  <List.Item>
    <div className={s.item}>
      <div className={s.info}>
        <img src={getLessonImageByType(item.type)} alt="lesson" />
        <div>
          <h2>{item.title}</h2>
          <p>{item.shortDescription}</p>
        </div>
      </div>

      <div className={s.buttons}>
        <button className={s.icon}>
          <EyeOutlined />
        </button>
        <span className={s.seporator} />
        <button>
          <DashOutlined className={s.dash} />
        </button>
      </div>
    </div>
  </List.Item>
);
