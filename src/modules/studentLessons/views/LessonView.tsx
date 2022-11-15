import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import {
  selectLessons,
  selectLessonsCollection,
  selectOpenLessonsIds,
} from '../../../store/slices/lessons';
import s from './LessonView.module.css';

export const LessonView = () => {
  const { lessonId } = useParams();

  const [read, setRead] = useState<boolean>(false);

  const lesson = useAppSelector(selectLessons);
  const lessonsCollection = useAppSelector(selectLessonsCollection);
  const openLessonsIds = useAppSelector(selectOpenLessonsIds);

  const [fetchLesson] = lessonsGraphqlApi.useLazyFetchLessonsQuery();

  useEffect(() => {
    if (!lessonId) return;

    fetchLesson({ lessonId });
  }, [fetchLesson, lessonId]);

  const studentLessonIds = lessonsCollection
    .filter((item) => openLessonsIds.some((id) => id === item.sys.id))
    .map((item) => item.sys.id);
  const handleReadLesson = () => setRead(!read);

  const id = studentLessonIds.findIndex((i) => i === lessonId);

  const prev = studentLessonIds[id - 1];
  const next = studentLessonIds[id + 1];

  if (!lesson) return null;

  return (
    <div className={s.lessonView}>
      {documentToReactComponents(lesson?.description?.json)}
      <div className={s.btn}>
        <Button className={s.nav} disabled={id === 0}>
          <Link to={`/student/lessons/${prev}`}>Назад</Link>
        </Button>
        <Button className={read ? s.readUp : s.read} onClick={handleReadLesson}>
          Прочитано
        </Button>
        <Button className={s.nav} disabled={id === studentLessonIds.length - 1}>
          <Link to={`/student/lessons/${next}`}>Вперед</Link>
        </Button>
      </div>
    </div>
  );
};
