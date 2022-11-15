import { useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import { selectLessons } from '../../../store/slices/lessons';
import s from './LessonView.module.css';

export const LessonView = () => {
  const lesson = useAppSelector(selectLessons);

  const { lessonId } = useParams();

  const [fetchLesson] = lessonsGraphqlApi.useLazyFetchLessonsQuery();

  useEffect(() => {
    if (!lessonId) return;

    fetchLesson({ lessonId });
  }, [fetchLesson, lessonId]);

  const history = useNavigate();
  const goBack = () => history(-1);

  if (!lesson) return null;
  return (
    <div className={s.lessonView}>
      {documentToReactComponents(lesson?.description?.json)}
      <div className={s.btn}>
        <Button className={s.nav} type="primary" onClick={goBack}>
          Назад
        </Button>
      </div>
    </div>
  );
};
