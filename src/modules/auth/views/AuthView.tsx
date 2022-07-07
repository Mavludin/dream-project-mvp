import { Checkbox, Radio, RadioChangeEvent } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../store/slices/auth';
import { UsersData, UserTypes, USER_TYPE_LIST } from '../models';
import s from './AuthView.module.css';

export const AuthView = () => {
  const [userRadioType, setUserRadioType] = useState<UserTypes>('student');
  const [isRemembered, setIsRemembered] = useState(false);

  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleRememberedChange = (e: CheckboxChangeEvent) => {
    setIsRemembered(e.target.checked);
  };

  const handleUserRadioChange = (e: RadioChangeEvent) => {
    setUserRadioType(e.target.value);
  };

  const [users, setUsers] = useState<UsersData[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(({ data }) => setUsers(data));
  }, []);

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isStudentExists = users.some(
      (user) =>
        user.userName === loginValue &&
        user.password === passwordValue &&
        user.type === userRadioType,
    );

    if (isStudentExists) {
      dispatch(logIn(isRemembered));
    }
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
