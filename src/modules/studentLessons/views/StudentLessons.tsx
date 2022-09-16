import { List } from 'antd';
import { useEffect, useState } from 'react';
import { LessonItem } from '../../../models';
import { useAppDispatch, useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import {
  fetchOpenLessonsIds,
  fetchReadLessonsIds,
  selectLessons,
  selectOpenLessonsIds,
} from '../../../store/slices/lessons';
import { StudentLessonsFilters } from '../components/StudentLessonsFilters/StudentLessonsFilters';
import { StudentLessonsItem } from '../components/StudentLessonsItem/StudentLessonsItem';
import s from './StudentLessons.module.css';

export const StudentLessons = () => {
  const dispatch = useAppDispatch();

  const [openLessons, setOpenLessons] = useState<LessonItem[]>([]);
  const lessons = useAppSelector(selectLessons);
  const [filteredData, setFilteredData] = useState<LessonItem[]>([]);

  const finalData = filteredData.length ? filteredData : openLessons;

  const openLessonsIds = useAppSelector(selectOpenLessonsIds);

  const [fetchLessons] = lessonsGraphqlApi.useLazyFetchLessonsQuery();

  useEffect(() => {
    if (lessons.length) return;

    fetchLessons();
  }, [fetchLessons, lessons]);

  useEffect(() => {
    dispatch(fetchOpenLessonsIds());
    dispatch(fetchReadLessonsIds());
  }, [dispatch]);

  useEffect(() => {
    setOpenLessons(
      lessons.filter((item) => openLessonsIds.some((id) => id === item.sys.id)),
    );
  }, [lessons, openLessonsIds]);

  return (
    <div className={s.lessons}>
      <div className={s.title}>
        <h1>Материалы</h1>
        <StudentLessonsFilters
          setFilteredData={setFilteredData}
          openLessons={openLessons}
        />
      </div>

      <List
        pagination={{
          pageSize: 6,
        }}
        grid={{
          gutter: 75,
          column: 3,
        }}
        dataSource={finalData}
        renderItem={(item) => <StudentLessonsItem item={item} />}
      />
    </div>
  );
};
