import { FilterOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React, { useMemo } from 'react';
import { FILTER_METHODS } from '../models';

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

  const menu = <Menu items={filterItems} />;
  return (
    <div>
      <FilterOutlined />
      <Dropdown overlay={menu}>
        <button>
          <Space>Фильтр</Space>
        </button>
      </Dropdown>
    </div>
  );
};
