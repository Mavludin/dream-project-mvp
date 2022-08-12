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
import { getLessonImageByType } from '../../../helpers/getLessonImageByType';
import {
  createOpenLesson,
  deleteOpenLesson,
  selectOpenLessonsIds,
} from '../../../store/slices/lessons';
import { useAppSelector, useAppDispatch } from '../../../store';

type Props = {
  item: LessonItem;
};

export const TeacherLessonsItem = ({ item }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openLessonsIds = useAppSelector(selectOpenLessonsIds);

  const dispatch = useAppDispatch();

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
      dispatch(deleteOpenLesson(item.sys.id)).finally(() => {
        setIsLoading(false);
        setIsOpen(false);
      });
    } else {
      setIsLoading(true);
      dispatch(createOpenLesson(item.sys.id)).finally(() => {
        setIsOpen(true);
        setIsLoading(false);
      });
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
