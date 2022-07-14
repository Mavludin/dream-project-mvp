import { List } from 'antd';
import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/Header/Header';
import { useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import { selectLessons } from '../../../store/slices/lessons';
import { TeacherLessonsFilters } from '../components/TeacherLessonsFilters';
import { TeacherLessonsItem } from '../components/TeacherLessonsItem';
import s from './TeacherLessons.module.css';

export const TeacherLessons = () => {
  const [openLessonsIds, setOpenLessonsIds] = useState<string[]>([]);
  const lessons = useAppSelector(selectLessons);

  const [fetchLessons] = lessonsGraphqlApi.useLazyFetchLessonsQuery();

  useEffect(() => {
    if (lessons.length) return;

    fetchLessons();
  }, [fetchLessons, lessons.length]);

  useEffect(() => {
    fetch('/api/open-lessons')
      .then((res) => res.json())
      .then((res) => setOpenLessonsIds(res.data));
  }, []);

  return (
    <>
      <Header />
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
          renderItem={(item) => (
            <TeacherLessonsItem openLessonsIds={openLessonsIds} item={item} />
          )}
        />
      </div>
    </>
  );
};
