import { useEffect, useMemo, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import {
  selectLessons,
  selectLessonsCollection,
} from '../../../store/slices/lessons';
import s from './TeacherLessonView.module.css';
import { NoMatchView } from '../../noMatch/views/NoMatchView';
import { LessonViewPreloader } from '../../studentLessons/views/LessonViewPreloader';

export const TeacherLessonView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { lessonId } = useParams();

  const [fetchLesson] = lessonsGraphqlApi.useLazyFetchLessonsQuery();

  const lesson = useAppSelector(selectLessons);
  const lessonsCollection = useAppSelector(selectLessonsCollection);

  const teaherLessonIds = lessonsCollection.map((item) => item.sys.id);

  const isRouteExists = useMemo(
    () => teaherLessonIds.some((id) => id === lessonId),
    [teaherLessonIds, lessonId],
  );

  const [fetchLessonsCollection] =
    lessonsGraphqlApi.useLazyFetchLessonsCollectionQuery();
  useEffect(() => {
    if (lessonsCollection.length) return;

    fetchLessonsCollection();
  }, [fetchLessonsCollection, lessonsCollection.length]);

  useEffect(() => {
    if (!lessonId) return;
    setIsLoading(true);
    fetchLesson({ lessonId }).finally(() => setIsLoading(false));
  }, [fetchLesson, lessonId]);

  const history = useNavigate();
  const goBack = () => history('/teacher/lessons');

  if (lessonsCollection.length && !isRouteExists) return <NoMatchView />;
  if (!lesson) return null;

  return (
    <div className={s.lessonView}>
      <LessonViewPreloader isLoading={isLoading}>
        {documentToReactComponents(lesson?.description?.json)}
      </LessonViewPreloader>
      <div className={s.btn}>
        <Button className={s.nav} type="primary" onClick={goBack}>
          Назад
        </Button>
      </div>
    </div>
  );
};
