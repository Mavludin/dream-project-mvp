import { Checkbox, Radio, RadioChangeEvent } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn, logOut } from "../../../store/slices/auth";
import { userTypeList } from "../helpers/auth-data";
import { UserData } from "../models";
import s from "./AuthView.module.css";

export const AuthView = () => {
  const [userId, setUserId] = useState(1);
  const [isRemembered, setIsRemembered] = useState(false);

  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleRememberedChange = (e: CheckboxChangeEvent) => {
    setIsRemembered(e.target.checked);
  };

  const handleUserChange = (e: RadioChangeEvent) => {
    setUserId(e.target.value);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(({ data }) => setUsers(data));
  }, []);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    users.forEach((user: UserData) => {
      if (user.userName === loginValue && user.password === passwordValue) {
        if (isRemembered && userId === 1) {
          dispatch(logIn());
          navigate("/student");
        } else if (userId === 1) {
          navigate("/student");
        }
      }
    });
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
          <Radio.Group onChange={handleUserChange} value={userId}>
            {userTypeList.map((value, id) => (
              <Radio value={id + 1} key={value}>
                {value}
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
