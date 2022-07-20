import {
  EllipsisOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Card, List, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import Meta from 'antd/lib/card/Meta';
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
        <Card
          bodyStyle={{
            lineHeight: '15px',
            marginBottom: '5px',
            height: '84px',
          }}
          size="small"
          actions={[
            isOpen ? (
              <EyeOutlined
                onClick={() => handleOpenCloseClick()}
                style={{ fontSize: '24px', color: '#009bcc' }}
                key="edit"
              />
            ) : (
              <EyeInvisibleOutlined
                onClick={() => handleOpenCloseClick()}
                style={{ fontSize: '24px' }}
                key="edit"
              />
            ),
            <EllipsisOutlined style={{ fontSize: '24px' }} key="ellipsis" />,
          ]}
        >
          <div className={s.info}>
            <img src={getLessonImageByType(item.type)} alt="lesson icon" />
            <Meta title={item.title} description={item.shortDescription} />
          </div>
        </Card>
      </List.Item>
    </Spin>
  );
};
