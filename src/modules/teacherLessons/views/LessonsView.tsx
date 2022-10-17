import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { selectLessons } from '../../../store/slices/lessons';
import s from './LessonsView.module.css';

export const LessonsView = () => {
  const lessons = useAppSelector(selectLessons);

  const { lsnType } = useParams();
  const history = useNavigate();
  const goBack = () => history(-1);

  const lessonData = lessons.filter((item) => item.type === lsnType);
  const lessonDocument = lessonData[0].description.json;

  return (
    <div className={s.lesson}>
      <div className={s.text}>{documentToReactComponents(lessonDocument)}</div>
      <Button className={s.button} type="primary" onClick={goBack}>
        Назад
      </Button>
    </div>
  );
};
