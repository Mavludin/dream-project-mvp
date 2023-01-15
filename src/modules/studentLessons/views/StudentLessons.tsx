import { List } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LessonItem } from '../../../models';
import { useAppDispatch, useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import {
  fetchOpenLessonsIds,
  fetchReadLessonsIds,
  selectLessonsCollection,
  selectOpenLessonsIds,
} from '../../../store/slices/lessons';
import { StudentLessonsFilters } from '../components/StudentLessonsFilters/StudentLessonsFilters';
import { StudentLessonsItem } from '../components/StudentLessonsItem/StudentLessonsItem';
import s from './StudentLessons.module.css';

export const StudentLessons = () => {
  const dispatch = useAppDispatch();

  const [openLessons, setOpenLessons] = useState<LessonItem[]>([]);
  const lessonsCollection = useAppSelector(selectLessonsCollection);
  const [filteredData, setFilteredData] = useState<LessonItem[]>([]);

  const finalData = filteredData.length ? filteredData : openLessons;

  const openLessonsIds = useAppSelector(selectOpenLessonsIds);

  const [fetchLessonsCollection] =
    lessonsGraphqlApi.useLazyFetchLessonsCollectionQuery();
  useEffect(() => {
    if (lessonsCollection.length) return;

    fetchLessonsCollection();
  }, [fetchLessonsCollection, lessonsCollection]);

  useEffect(() => {
    dispatch(fetchOpenLessonsIds());
    dispatch(fetchReadLessonsIds());
  }, [dispatch]);

  useEffect(() => {
    setOpenLessons(
      lessonsCollection.filter((item) =>
        openLessonsIds.some((id) => id === item.sys.id),
      ),
    );
  }, [lessonsCollection, openLessonsIds]);

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
        renderItem={(item) => (
          <Link to={`/student/lessons/${item.sys.id}`}>
            <StudentLessonsItem item={item} />
          </Link>
        )}
      />
    </div>
  );
};
