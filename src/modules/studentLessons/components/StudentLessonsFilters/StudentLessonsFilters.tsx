import { useMemo } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Space } from 'antd';
import s from './StudentLessonsFilters.module.css';
import { FILTER_METHODS } from '../../models';

export const StudentLessonsFilters = () => {
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

  const menu = <Menu items={filterItems} />;
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
