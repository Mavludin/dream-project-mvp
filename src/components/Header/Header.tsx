import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logOut, selectUserType } from '../../store/slices/auth';
import s from './Header.module.css';

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userType = useAppSelector(selectUserType);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <div className={s.header}>
      <div className={s.container}>
        <nav className={s.nav}>
          <Link to={`/${userType}/assignments`}>Задачи</Link>
          <Link to={`/${userType}/lessons`}>Материалы</Link>
        </nav>
        <div className={s.button}>
          Профиль
          <div className={s.dropDown}>
            <ul>
              <li>
                <button>Личный кабинет</button>
              </li>
              <li>
                <button onClick={handleLogOut}>Выход</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
