import { List } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import {
  fetchOpenLessonsIds,
  selectLessonsCollection,
} from '../../../store/slices/lessons';
import { TeacherLessonsFilters } from '../components/TeacherLessonsFilters';
import { TeacherLessonsItem } from '../components/TeacherLessonsItem';
import s from './TeacherLessons.module.css';

export const TeacherLessons = () => {
  const dispatch = useAppDispatch();

  const lessonsCollection = useAppSelector(selectLessonsCollection);

  const [fetchLessonsCollection] =
    lessonsGraphqlApi.useLazyFetchLessonsCollectionQuery();
  useEffect(() => {
    if (lessonsCollection.length) return;

    fetchLessonsCollection();
  }, [fetchLessonsCollection, lessonsCollection.length]);

  useEffect(() => {
    dispatch(fetchOpenLessonsIds());
  }, [dispatch]);

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
        dataSource={lessonsCollection}
        renderItem={(item) => <TeacherLessonsItem item={item} />}
      />
    </div>
  );
};
