import { useEffect, useMemo } from 'react';
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

export const TeacherLessonView = () => {
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
  }, [fetchLessonsCollection, lessonsCollection]);

  useEffect(() => {
    if (!lessonId) return;
    fetchLesson({ lessonId });
  }, [fetchLesson, lessonId]);

  const history = useNavigate();
  const goBack = () => history('/teacher/lessons');

  if (lessonsCollection.length && !isRouteExists) return <NoMatchView />;
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
