import React from 'react';
import { matchPath } from 'react-router-dom';

import { SidebarItemsType } from '@utils/types';
import SidebarNavListItem from './SidebarNavListItem';
import SidebarNavList from './SidebarNavList';

type ChildRoutesProps = {
  depth: number;
  page: SidebarItemsType;
  items: JSX.Element[];
  currentRoute: string;
};

const ChildRoutes = (props: ChildRoutesProps) => {
  const { items, page, depth, currentRoute } = props;

  if (page.children) {
    const open = page.href
      ? !!matchPath(
          {
            path: page.href,
            end: false,
          },
          currentRoute
        )
      : false;

    items.push(
      <SidebarNavListItem
        depth={depth}
        key={page.title}
        badge={page.badge}
        open={!!open}
        title={page.title}
        href={page.href}
      >
        <SidebarNavList depth={depth + 1} pages={page.children} />
      </SidebarNavListItem>
    );
  } else {
    items.push(
      <SidebarNavListItem
        depth={depth}
        href={page.href}
        key={page.title}
        badge={page.badge}
        title={page.title}
      />
    );
  }

  return items;
};

export default ChildRoutes;
