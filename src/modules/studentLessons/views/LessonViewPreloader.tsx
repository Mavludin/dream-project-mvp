import { Skeleton } from 'antd';
import { ReactNode } from 'react';
import s from './StudentLessonView.module.css';

type Props = {
  isLoading: boolean;
  children: ReactNode;
};

export const LessonViewPreloader = ({ isLoading, children }: Props) =>
  isLoading ? (
    <>
      <Skeleton className={s.skeletonTitle} paragraph={false} />
      <Skeleton paragraph={{ rows: 3 }} title={false} />
      <Skeleton paragraph={{ rows: 3 }} title={false} />
    </>
  ) : (
    <>{children}</>
  );
