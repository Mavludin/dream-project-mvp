import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const HeaderPage = () => (
  <>
    <Header />
    <Outlet />
  </>
);
