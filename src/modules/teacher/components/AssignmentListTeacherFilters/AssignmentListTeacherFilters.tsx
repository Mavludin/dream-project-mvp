import { FilterOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useMemo, useState } from 'react';
import { AssignmentsData, Difficulty, FILTER_METHODS } from '../../models';
import s from './AssignmentListTeacherFilters.module.css';

type Props = {
  assignmentsData: AssignmentsData[];
  setFilteredData: (arr: AssignmentsData[]) => void;
  openAssignmentsIds: number[];
};

export const AssignmentListTeacherFilters = ({
  assignmentsData,
  setFilteredData,
  openAssignmentsIds,
}: Props) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const filterDifficulty = (difficulty: Difficulty) => {
    setFilteredData(
      assignmentsData.filter((item) => item.difficulty === difficulty),
    );
  };

  const resetFilterList = () => setFilteredData([]);

  const filterOpenList = () => {
    setFilteredData(
      assignmentsData.filter((item) =>
        openAssignmentsIds.some((id) => id === item.id),
      ),
    );
  };

  const filterCloseList = () => {
    setFilteredData(
      assignmentsData.filter(
        (item) => !openAssignmentsIds.some((id) => id === item.id),
      ),
    );
  };

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

  const handleMenuFilters: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      resetFilterList();
    } else if (e.key === '2-1') {
      filterOpenList();
    } else if (e.key === '2-2') {
      filterCloseList();
    } else if (e.key === '3-1') {
      filterDifficulty('easy');
    } else if (e.key === '3-2') {
      filterDifficulty('medium');
    } else if (e.key === '3-3') {
      filterDifficulty('hard');
    }
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  const menu = (
    <Menu
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={handleMenuFilters}
      items={filterItems}
    />
  );

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
