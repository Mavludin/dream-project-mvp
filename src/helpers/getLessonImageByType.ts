import jsImg from '../assets/js.svg';
import htmlImg from '../assets/html.svg';
import reactImg from '../assets/react.svg';
import cssImg from '../assets/css.svg';

export const getLessonImageByType = (lessonType: string) => {
  switch (lessonType) {
    case 'react':
      return reactImg;
    case 'html':
      return htmlImg;
    case 'css':
      return cssImg;
    default:
      return jsImg;
  }
};
