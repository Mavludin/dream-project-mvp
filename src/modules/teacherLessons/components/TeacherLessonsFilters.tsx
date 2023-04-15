import { FilterOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import React, { useMemo } from 'react';
import { FILTER_METHODS } from '../models';
import s from './TeacherLessonsFilters.module.css';
import { MenuList } from '../../../components/MenuList';

export const TeacherLessonsFilters = () => {
  const filterItems = useMemo(
    () =>
      FILTER_METHODS.map((item) => ({
        key: item.id,
        label: item.name,
        children:
          item.children &&
          item.children.map((itemChild) => ({
            key: `${item.id}-${itemChild.id}`,
            label: itemChild.name,
          })),
      })),
    [],
  );

  const menu = MenuList(filterItems);

  return (
    <div className={s.filter}>
      <FilterOutlined />
      <Dropdown overlay={menu}>
        <button>
          <Space>Фильтр</Space>
        </button>
      </Dropdown>
    </div>
  );
};
