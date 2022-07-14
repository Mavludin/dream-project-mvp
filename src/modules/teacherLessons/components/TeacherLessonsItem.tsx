import {
  DashOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { List, Spin } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { LessonItem } from '../../../models';
import s from './TeacherLessonsItem.module.css';
import { getLessonImageByType } from '../helpers/getLessonImageByType';

type Props = {
  item: LessonItem;
  openLessonsIds: string[];
};

export const TeacherLessonsItem = ({ item, openLessonsIds }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isMatchIds = useMemo(
    () => openLessonsIds.some((id) => id === item.sys.id),
    [openLessonsIds, item],
  );

  useEffect(() => {
    if (isMatchIds) {
      setIsOpen(true);
    }
  }, [isMatchIds]);

  const handleOpenCloseClick = async () => {
    if (isOpen) {
      setIsLoading(true);
      const res = await fetch(`/api/open-lessons/${item.sys.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setIsOpen(false);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      const res = await fetch('/api/open-lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessonId: item.sys.id }),
      });

      if (res.ok) {
        setIsOpen(true);
        setIsLoading(false);
      }
    }
  };
  return (
    <Spin tip="Loading..." spinning={isLoading}>
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
            {isOpen ? (
              <button
                className={s.openIcon}
                onClick={() => handleOpenCloseClick()}
              >
                <EyeOutlined />
              </button>
            ) : (
              <button
                className={s.closeIcon}
                onClick={() => handleOpenCloseClick()}
              >
                <EyeInvisibleOutlined />
              </button>
            )}

            <span className={s.seporator} />
            <button>
              <DashOutlined className={s.dash} />
            </button>
          </div>
        </div>
      </List.Item>
    </Spin>
  );
};
