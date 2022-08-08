import { getLessonImageByType } from './getLessonImageByType';
import reactImg from '../assets/react.svg';
import cssImg from '../assets/css.svg';
import htmlImg from '../assets/html.svg';
import jsImg from '../assets/js.svg';

test('function should return a link to the image', () => {
  expect(getLessonImageByType('react')).toBe(reactImg);
  expect(getLessonImageByType('css')).toBe(cssImg);
  expect(getLessonImageByType('html')).toBe(htmlImg);
  expect(getLessonImageByType('js')).toBe(jsImg);
});
