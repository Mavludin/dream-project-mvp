import { useAppDispatch } from '../../store';
import { logOut } from '../../store/slices/auth';
import s from './Header.module.css';

export function Header() {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={s.header}>
      <div className={s.container}>
        <button className={s.button}>
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
        </button>
      </div>
    </div>
  );
}
