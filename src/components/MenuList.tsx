import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import type { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { useCallback, useState } from 'react';

export const MenuList = (
  filterItems: ItemType[],
  handleMenuFilters: MenuClickEventHandler = () => null,
) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onOpenChange: MenuProps['onOpenChange'] = useCallback(
    (keys: string[]) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    },
    [openKeys],
  );

  return (
    <Menu
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={filterItems}
      onClick={handleMenuFilters}
    />
  );
};
