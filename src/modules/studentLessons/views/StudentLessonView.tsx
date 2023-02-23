import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useAppDispatch, useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import {
  createReadLessonId,
  fetchOpenLessonsIds,
  fetchReadLessonsIds,
  selectLessons,
  selectLessonsCollection,
  selectOpenLessonsIds,
  selectReadLessonsIds,
} from '../../../store/slices/lessons';
import s from './StudentLessonView.module.css';
import { NoMatchView } from '../../noMatch/views/NoMatchView';

export const StudentLessonView = () => {
  const dispatch = useAppDispatch();

  const { lessonId } = useParams();

  const lesson = useAppSelector(selectLessons);
  const lessonsCollection = useAppSelector(selectLessonsCollection);
  const readLessonsIds = useAppSelector(selectReadLessonsIds);
  const openLessonsIds = useAppSelector(selectOpenLessonsIds);

  const [fetchLesson] = lessonsGraphqlApi.useLazyFetchLessonsQuery();

  const studentLessonIds = lessonsCollection.map((item) => item.sys.id);

  const isRouteExists = useMemo(
    () => studentLessonIds.some((id) => id === lessonId),
    [studentLessonIds, lessonId],
  );

  const filteredData = useMemo(
    () =>
      studentLessonIds.filter((studId) =>
        openLessonsIds.some((id) => id === studId),
      ),
    [studentLessonIds, openLessonsIds],
  );

  const isRead = readLessonsIds.some((id) => id === lessonId);

  const index = filteredData.findIndex((i) => i === lessonId);
  const prev = filteredData[index - 1];
  const next = filteredData[index + 1];

  const handleReadLesson = useCallback(() => {
    if (!lessonId || isRead) return;
    dispatch(createReadLessonId(lessonId));
  }, [lessonId, isRead, dispatch]);

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

  useEffect(() => {
    dispatch(fetchOpenLessonsIds());
    dispatch(fetchReadLessonsIds());
  }, [dispatch]);

  if (lessonsCollection.length && !isRouteExists) return <NoMatchView />;
  if (!lesson) return null;

  return (
    <div className={s.lessonView}>
      <div className={s.lessonWrapper}>
        <Link className={s.backBtn} to="/student/lessons">
          <ArrowLeftOutlined />
        </Link>
        {documentToReactComponents(lesson?.description?.json)}
      </div>

      <div className={s.btn}>
        <Button className={s.nav} disabled={index === 0}>
          <Link to={`/student/lessons/${prev}`}>Назад</Link>
        </Button>
        <Button
          className={isRead ? s.readUp : s.read}
          onClick={handleReadLesson}
        >
          Прочитано
        </Button>
        <Button className={s.nav} disabled={index === filteredData.length - 1}>
          <Link to={`/student/lessons/${next}`}>Вперед</Link>
        </Button>
      </div>
    </div>
  );
};
