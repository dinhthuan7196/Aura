import async from '@components/Async';
import PrivateRoute from '@pages/Login/PrivateRoute';

// Page 404
const Page404 = async(() => import('@pages/Page404'));

// Auth
const Login = async(() => import('@pages/Login'));
const RootAuth = async(() => import('@pages/Login/RootAuth'));
const ResetPassword = async(() => import('@pages/Login/ResetPassword'));

// Dashboard
const Dashboard = async(() => import('@pages/Dashboard'));
const Scores = async(() => import('@pages/Dashboard/Scores'));

// Business Opportunity
const SummaryBO = async(
  () => import('@pages/User/BusinessOpportunity/Summary')
);
const CreateBO = async(() => import('@pages/User/BusinessOpportunity/Create'));

// Business Value Realized
const SummaryBVR = async(
  () => import('@pages/User/BusinessValueRealized/Summary')
);
const CreateBVR = async(
  () => import('@pages/User/BusinessValueRealized/Create')
);

// Attendance
const Attendance = async(() => import('@pages/User/Attendance'));

// Business Discovery
const BusinessDiscovery = async(() => import('@pages/User/BusinessDiscovery'));

// Business Discovery
const Visitors = async(() => import('@pages/User/Visitors'));

// Training
const Training = async(() => import('@pages/User/Training'));

// Users
const Users = async(() => import('@pages/Admin/Users'));
const Trends = async(() => import('@pages/Admin/Trends'));
const Badges = async(() => import('@pages/Admin/Badges'));
const AdminTraining = async(() => import('@pages/Admin/Training'));

const userRoutes = [
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'scores',
        element: <Scores />,
      },
    ],
  },
  {
    path: 'businessOpportunity',
    element: <Dashboard />,
    children: [
      {
        path: 'summary',
        element: <SummaryBO />,
      },
      {
        path: 'create',
        element: <CreateBO />,
      },
    ],
  },
  {
    path: 'businessValueRealized',
    element: <Dashboard />,
    children: [
      {
        path: 'summary',
        element: <SummaryBVR />,
      },
      {
        path: 'create',
        element: <CreateBVR />,
      },
    ],
  },
  {
    path: 'attendance',
    element: <Dashboard />,
    children: [
      {
        path: 'summary',
        element: <Attendance />,
      },
    ],
  },
  {
    path: 'businessDiscovery',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <BusinessDiscovery />,
      },
    ],
  },
  {
    path: 'visitors',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <Visitors />,
      },
    ],
  },
  {
    path: 'training',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <Training />,
      },
    ],
  },
];

const adminRoutes = [
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'scores',
        element: (
          <PrivateRoute>
            <Scores />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'attendance',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'summary',
        element: (
          <PrivateRoute>
            <Attendance />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'roll-call',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'summary',
        element: (
          <PrivateRoute>
            <BusinessDiscovery />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-new',
        element: (
          <PrivateRoute>
            <SummaryBVR />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'users',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'trends',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <Trends />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'badges',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <Badges />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'training',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <AdminTraining />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'editUser',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <Training />
          </PrivateRoute>
        ),
      },
    ],
  },
];

const defaultRoutes = [
  {
    path: '',
    element: <RootAuth />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: '*',
    element: <RootAuth />,
    children: [
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];

export { userRoutes, adminRoutes, defaultRoutes };
