import { Checkbox, Radio, RadioChangeEvent } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useState } from "react";
import s from "./AuthView.module.css";

export const AuthView = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onUserChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <form className={s.auth}>
      <div className={s.container}>
        <h1 className={s.title}>Авторизация</h1>
        <div className={s.inputs}>
          <input type="text" placeholder="Логин" required />
          <input type="password" placeholder="Пароль" required />
        </div>
        <Checkbox onChange={onChange}>Запомнить меня</Checkbox>
        <div>
          <Radio.Group onChange={onUserChange} value={value}>
            <Radio value={1}>Ученик</Radio>
            <Radio value={2}>Преподаватель</Radio>
          </Radio.Group>
        </div>
        <button type="submit" className={s.btn}>ВХОД</button>
      </div>
    </form>
  );
};
