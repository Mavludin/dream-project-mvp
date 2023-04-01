import { FilterOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useMemo, useState } from 'react';
import { AssignmentsData, Difficulty, FILTER_METHODS } from '../../models';
import s from './AssignmentListFilters.module.css';
import { selectAssignmentsData } from '../../../../store/slices/assignments';
import { useAppSelector } from '../../../../store';

type Props = {
  setFilteredData: (arr: AssignmentsData[]) => void;
};

export const AssignmentListFilters = ({ setFilteredData }: Props) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const { assignmentsData, completedAssignments } = useAppSelector(
    selectAssignmentsData,
  );

  const resetFilterList = () => setFilteredData([]);

  const filterDifficulty = (difficulty: Difficulty) => {
    const easy = assignmentsData.filter(
      (item) => item.difficulty === difficulty,
    );

    setFilteredData(easy);
  };

  const filterCompleted = () => {
    const complete = assignmentsData.filter((item) =>
      completedAssignments?.some(
        (completedItem) => completedItem.id === item.id,
      ),
    );

    setFilteredData(complete);
  };

  const filterUncompleted = () => {
    const complete = assignmentsData.filter((item) =>
      completedAssignments?.every(
        (completedItem) => item.id !== completedItem.id,
      ),
    );

    setFilteredData(complete);
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
      filterCompleted();
    } else if (e.key === '2-2') {
      filterUncompleted();
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
