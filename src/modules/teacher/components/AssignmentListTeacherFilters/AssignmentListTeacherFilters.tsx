import { FilterOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { FILTER_METHODS } from '../../models';
import s from './AssignmentListTeacherFilters.module.css';

export const AssignmentListTeacherFilters = () => {
  const filterItems = FILTER_METHODS.map((item) => ({
    key: item.id,
    label: item.name,
    children:
      item.children &&
      item.children.map((itemChild) => ({
        key: `${item.id}-${itemChild.id}`,
        label: itemChild.name,
      })),
  }));

  return (
    <div className={s.filter}>
      <FilterOutlined />
      <Dropdown overlay={<Menu items={filterItems} />}>
        <button>
          <Space>Фильтр</Space>
        </button>
      </Dropdown>
    </div>
  );
};
