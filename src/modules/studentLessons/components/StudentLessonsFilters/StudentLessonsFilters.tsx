import { useMemo } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Space, MenuProps } from 'antd';
import s from './StudentLessonsFilters.module.css';
import { FILTER_METHODS, Type } from '../../models';
import { LessonItem } from '../../../../models';

type Props = {
  openLessons: LessonItem[];
  setFilteredData: (arr: LessonItem[]) => void;
};

export const StudentLessonsFilters = ({
  setFilteredData,
  openLessons,
}: Props) => {
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

  const resetFilterList = () => setFilteredData([]);

  const filterType = (type: Type) => {
    setFilteredData(openLessons.filter((item) => item.type === type));
  };

  const handleMenuFilters: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      resetFilterList();
    } else if (e.key === '2-1') {
      console.log(1);
    } else if (e.key === '2-2') {
      console.log(2);
    } else if (e.key === '3-1') {
      filterType('html');
    } else if (e.key === '3-2') {
      filterType('css');
    } else if (e.key === '3-3') {
      filterType('js');
    } else if (e.key === '3-4') {
      filterType('react');
    }
  };

  const menu = <Menu onClick={handleMenuFilters} items={filterItems} />;
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
