import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useEffect } from 'react';
import { useAppSelector } from './store';
import { lessonsGraphqlApi } from './store/api/lessonsApi';
import { selectLessons } from './store/slices/lessons';

export const Component = () => {
  const lessons = useAppSelector(selectLessons);

  const [fetchLessons, { isFetching }] =
    lessonsGraphqlApi.useLazyFetchLessonsQuery();

  useEffect(() => {
    if (lessons.length) return;

    fetchLessons();
  }, [fetchLessons, lessons.length]);

  if (!lessons.length && isFetching) return null;

  return (
    <div>
      {lessons.map((lesson) => (
        <div key={lesson.sys.id}>
          <h2>{lesson.title}</h2>
          <div>{lesson.shortDescription}</div>
          <div>
            {documentToReactComponents(
              lesson.description?.json || JSON.parse(''),
            )}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
