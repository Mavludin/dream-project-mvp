import React from 'react';
import s from './Header.module.css';

export function Header() {
  return (
    <div className={s.header}>
      <div className={s.container}>
        <button className={s.button}>Профиль</button>
      </div>
    </div>
  );
}
