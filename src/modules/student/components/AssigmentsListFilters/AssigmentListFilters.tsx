import { FilterOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { AssigmentsData, Difficulty, FILTER_METHODS } from "../../models";
import s from "./AssigmentListFilters.module.css";

type Props = {
   assignmentsData: AssigmentsData[];
   setFilteredData: (arr: AssigmentsData[]) => void;
};

export const AssigmentListFilters = ({
   assignmentsData,
   setFilteredData,
}: Props) => {
   const filterDifficulty = (difficulty: Difficulty) => {
      const easy = assignmentsData.filter(
         (item) => item.difficulty === difficulty
      );

      setFilteredData(easy);
   };

   const resetFilterList = () => setFilteredData([]);

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

   const handleMenuFilters: MenuClickEventHandler = (e) => {
      if (e.key === "1") resetFilterList();
      if (e.key === "3-1") filterDifficulty("easy");
      if (e.key === "3-2") filterDifficulty("medium");
      if (e.key === "3-3") filterDifficulty("hard");
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
