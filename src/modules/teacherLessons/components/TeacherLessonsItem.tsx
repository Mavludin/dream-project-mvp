import {
  EllipsisOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Card, List, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';
import { LessonItem } from '../../../models';
import s from './TeacherLessonsItem.module.css';
import { getLessonImageByType } from '../../../helpers/getLessonImageByType';
import {
  createOpenLessonId,
  deleteOpenLessonId,
  selectOpenLessonsIds,
} from '../../../store/slices/lessons';
import { useAppSelector, useAppDispatch } from '../../../store';

type Props = {
  item: LessonItem;
};

export const TeacherLessonsItem = ({ item }: Props) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openLessonsIds = useAppSelector(selectOpenLessonsIds);

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
    setIsLoading(true);
    if (isOpen) {
      dispatch(deleteOpenLessonId(item.sys.id)).finally(() => {
        setIsLoading(false);
        setIsOpen(false);
      });
    } else {
      dispatch(createOpenLessonId(item.sys.id)).finally(() => {
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
          <Link to={`/teacher/lessons/${item.type}`}>
            <div className={s.info}>
              <img src={getLessonImageByType(item.type)} alt="lesson icon" />
              <Meta title={item.title} description={item.shortDescription} />
            </div>
          </Link>
        </Card>
      </List.Item>
    </Spin>
  );
};
