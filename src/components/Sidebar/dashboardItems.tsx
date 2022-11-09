import { SidebarItemsType } from '@utils/types';

const moduleUserItems = [
  {
    href: '/businessOpportunity',
    title: 'Business Opportunity',
    children: [
      {
        href: '/businessOpportunity/summary',
        title: 'Summary',
      },
      {
        href: '/businessOpportunity/create',
        title: 'Create new',
      },
    ],
  },
  {
    href: '/businessValueRealized',
    title: 'Business Value Realized',
    children: [
      {
        href: '/businessValueRealized/summary',
        title: 'Summary',
      },
      {
        href: '/businessValueRealized/create',
        title: 'Create new',
      },
    ],
  },
  {
    href: '/attendance',
    title: 'Attendance',
    children: [
      {
        href: '/attendance/summary',
        title: 'Summary',
      },
    ],
  },
  {
    href: '/businessDiscovery',
    title: 'Business Discovery',
  },
  {
    href: '/visitors',
    title: 'Visitors',
  },
  {
    href: '/training',
    title: 'Training',
  },
] as SidebarItemsType[];

const dashboardItems = [
  {
    href: '/dashboard/scores',
    title: 'Scores',
  },
] as SidebarItemsType[];

const moduleAdminItems = [
  {
    href: '/attendance',
    title: 'Attendance',
    children: [
      {
        href: '/attendance/summary',
        title: 'Summary',
      },
    ],
  },
  {
    href: '/roll-call',
    title: 'Roll Call',
    children: [
      {
        href: '/roll-call/summary',
        title: 'Summary',
      },
      {
        href: '/roll-call/add-new',
        title: 'Add New',
      },
    ],
  },
  {
    href: '/users',
    title: 'Users',
  },
  {
    href: '/trends',
    title: 'Trends',
  },
  {
    href: '/badges',
    title: 'Badges',
  },
  {
    href: '/training',
    title: 'Training',
  },
  {
    href: '/editUser',
    title: 'Add/Remove User',
  },
] as SidebarItemsType[];

const userDashboardItems = [
  {
    title: 'Modules',
    pages: moduleUserItems,
  },
  {
    title: 'Dashboard',
    pages: dashboardItems,
  },
];

const adminDashboardItems = [
  {
    title: 'Modules',
    pages: moduleAdminItems,
  },
  {
    title: 'Dashboard',
    pages: dashboardItems,
  },
];

export { adminDashboardItems, userDashboardItems };
