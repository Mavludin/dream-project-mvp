import { List } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import { fetchOpenLessons, selectLessons } from '../../../store/slices/lessons';
import { TeacherLessonsFilters } from '../components/TeacherLessonsFilters';
import { TeacherLessonsItem } from '../components/TeacherLessonsItem';
import s from './TeacherLessons.module.css';

export const TeacherLessons = () => {
  const lessons = useAppSelector(selectLessons);

  const [fetchLessons] = lessonsGraphqlApi.useLazyFetchLessonsQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lessons.length) return;

    fetchLessons();
  }, [fetchLessons, lessons.length]);

  useEffect(() => {
    dispatch(fetchOpenLessons());
  }, []);

  return (
    <div className={s.lessons}>
      <div className={s.title}>
        <h1>Материалы</h1>
        <TeacherLessonsFilters />
      </div>

      <List
        pagination={{
          pageSize: 6,
        }}
        grid={{
          gutter: 75,
          column: 3,
        }}
        dataSource={lessons}
        renderItem={(item) => <TeacherLessonsItem item={item} />}
      />
    </div>
  );
};
