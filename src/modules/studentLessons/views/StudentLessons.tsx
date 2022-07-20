import { List } from 'antd';
import { useEffect } from 'react';
import { Header } from '../../../components/Header/Header';
import { useAppSelector } from '../../../store';
import { lessonsGraphqlApi } from '../../../store/api/lessonsApi';
import { selectLessons } from '../../../store/slices/lessons';
import { StudentLessonsFilters } from '../components/StudentLessonsFilters/StudentLessonsFilters';
import { StudentLessonsItem } from '../components/StudentLessonsItem/StudentLessonsItem';
import s from './StudentLessons.module.css';

export const StudentLessons = () => {
  const lessons = useAppSelector(selectLessons);

  const [fetchLessons] = lessonsGraphqlApi.useLazyFetchLessonsQuery();

  useEffect(() => {
    if (lessons.length) return;

    fetchLessons();
  }, [fetchLessons, lessons.length]);

  return (
    <>
      <Header />
      <div className={s.lessons}>
        <div className={s.title}>
          <h1>Материалы</h1>
          <StudentLessonsFilters />
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
          renderItem={(item) => <StudentLessonsItem item={item} />}
        />
      </div>
    </>
  );
};
