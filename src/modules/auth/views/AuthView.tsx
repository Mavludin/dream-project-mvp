import { Checkbox, Radio, RadioChangeEvent } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { logIn, selectUserType } from '../../../store/slices/auth';
import { setUserId } from '../../../store/slices/userData';
import { UsersData, UserTypes, USER_TYPE_LIST } from '../models';
import s from './AuthView.module.css';
import AppConfig from '../../../config/AppConfig';

export const AuthView = () => {
  const dispatch = useAppDispatch();

  const usersType = useAppSelector(selectUserType);

  const [userRadioType, setUserRadioType] = useState<UserTypes>(usersType);
  const [isRemembered, setIsRemembered] = useState(false);

  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleRememberedChange = (e: CheckboxChangeEvent) => {
    setIsRemembered(e.target.checked);
  };

  const handleUserRadioChange = (e: RadioChangeEvent) => {
    setUserRadioType(e.target.value);
  };

  const handleLogIn = (user: UsersData) => {
    if (user) {
      dispatch(logIn({ isRemembered, userRadioType }));
      dispatch(setUserId(user.id));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${AppConfig.apiUrl}api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: loginValue,
        password: passwordValue,
        type: userRadioType,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => handleLogIn(data));
  };

  return (
    <form className={s.auth} onSubmit={handleSubmit}>
      <div className={s.container}>
        <h1 className={s.title}>Авторизация</h1>
        <div className={s.inputs}>
          <input
            type="text"
            placeholder="Логин"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            required
          />
        </div>
        <Checkbox onChange={handleRememberedChange} checked={isRemembered}>
          Запомнить меня
        </Checkbox>
        <div>
          <Radio.Group onChange={handleUserRadioChange} value={userRadioType}>
            {USER_TYPE_LIST.map((userType) => (
              <Radio value={userType.type} key={userType.type}>
                {userType.name}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <button type="submit" className={s.btn}>
          ВХОД
        </button>
      </div>
    </form>
  );
};
