import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { logOut } from '../../store/slices/auth';
import s from './Header.module.css';

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <div className={s.header}>
      <div className={s.container}>
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
