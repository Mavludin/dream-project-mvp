import { FilterOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import type { MenuProps } from 'antd';
import {
  AssigmentsData,
  CompletedAssignment,
  Difficulty,
  FILTER_METHODS,
} from '../../models';
import s from './AssigmentListFilters.module.css';

type Props = {
  openAssignments: AssigmentsData[];
  completedAssignments: CompletedAssignment[] | undefined;
  setFilteredData: (arr: AssigmentsData[]) => void;
};

export const AssigmentListFilters = ({
  openAssignments,
  setFilteredData,
  completedAssignments,
}: Props) => {
  const resetFilterList = () => setFilteredData([]);

  const filterDifficulty = (difficulty: Difficulty) => {
    const easy = openAssignments.filter(
      (item) => item.difficulty === difficulty,
    );

    setFilteredData(easy);
  };

  const filterCompleted = () => {
    const complete = openAssignments.filter((item) =>
      completedAssignments?.some(
        (completedItem) => completedItem.id === item.id,
      ),
    );

    setFilteredData(complete);
  };

  const filterUncompleted = () => {
    const complete = openAssignments.filter((item) =>
      completedAssignments?.every(
        (completedItem) => item.id !== completedItem.id,
      ),
    );

    setFilteredData(complete);
  };

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

  const handleMenuFilters: MenuProps['onClick'] = (e) => {
    if (e.key === '1') resetFilterList();
    if (e.key === '2-1') filterCompleted();
    if (e.key === '2-2') filterUncompleted();
    if (e.key === '3-1') filterDifficulty('easy');
    if (e.key === '3-2') filterDifficulty('medium');
    if (e.key === '3-3') filterDifficulty('hard');
  };

  const menu = (
    <Menu onClick={(e) => handleMenuFilters(e)} items={filterItems} />
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
