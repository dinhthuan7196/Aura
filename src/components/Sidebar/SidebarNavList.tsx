import React from 'react';
import { useLocation } from 'react-router-dom';

import { SidebarItemsType } from '@utils/types';
import ChildRoutes from './ChildRoutes';

type SidebarNavListProps = {
  depth: number;
  pages: SidebarItemsType[];
};

const SidebarNavList: React.FC<SidebarNavListProps> = (props) => {
  const { pages, depth } = props;
  const router = useLocation();
  const currentRoute = router.pathname;

  const childRoutes = pages.reduce(
    (items, page) => ChildRoutes({ items, page, currentRoute, depth }),
    [] as JSX.Element[]
  );

  return (
    <div style={{ paddingLeft: depth && depth > 0 ? 15 : 8 }}>
      {childRoutes}
    </div>
  );
};

export default SidebarNavList;
