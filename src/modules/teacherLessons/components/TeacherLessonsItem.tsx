import { DashOutlined, EyeOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React from 'react';
import { LessonItem } from '../../../models';
import s from './TeacherLessonsItem.module.css';
import jsImg from '../assets/js.svg';
import htmlImg from '../assets/html.svg';
import reactImg from '../assets/react.svg';
import cssImg from '../assets/css.svg';

type Props = {
  item: LessonItem;
};

export const TeacherLessonsItem = ({ item }: Props) => {
  let imgSrc = jsImg;
  if (item.type === 'html') {
    imgSrc = htmlImg;
  } else if (item.type === 'css') {
    imgSrc = cssImg;
  } else if (item.type === 'react') {
    imgSrc = reactImg;
  }
  return (
    <List.Item>
      <div className={s.item}>
        <div className={s.info}>
          <img src={imgSrc} alt="lesson" />
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
};
