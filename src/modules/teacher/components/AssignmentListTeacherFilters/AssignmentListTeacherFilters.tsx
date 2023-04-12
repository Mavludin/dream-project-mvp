import { FilterOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useMemo } from 'react';
import { AssignmentsData, Difficulty, FILTER_METHODS } from '../../models';
import s from './AssignmentListTeacherFilters.module.css';
import { useMenuList } from '../../../../helpers/useMenuList';

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

  const menu = useMenuList(filterItems, handleMenuFilters);

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
