import { Link } from 'react-router-dom';
import '../../../fonts/fonts.css';
import s from './NoMatchView.module.css';

export const NoMatchView = () => (
  <div className={s.no_match}>
    <h1 className={s.code}>404</h1>
    <h2 className={s.text}>
      not found
      <span />
    </h2>
    <Link to="/">go home...</Link>
  </div>
);
