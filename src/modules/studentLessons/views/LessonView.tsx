import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import { selectLessons } from '../../../store/slices/lessons';
import styles from './LessonView.module.css';

export const LessonView = () => {
  const { lessonId } = useParams();

  const [fetchLesson] = lessonsGraphqlApi.useLazyFetchLessonsQuery();

  const lesson = useAppSelector(selectLessons);

  useEffect(() => {
    if (lesson || !lessonId) return;

    fetchLesson({ lessonId });
  }, [fetchLesson, lesson, lessonId]);

  if (!lesson) return null;

  return (
    <div className={styles.lessonView}>
      {documentToReactComponents(lesson?.description?.json)}

      <div className={styles.btn}>
        <button className={styles.nav}>Назад</button>
        <button className={styles.read}>Прочитано</button>
        <button className={styles.nav}>Далее</button>
      </div>
    </div>
  );
};
