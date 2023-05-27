import { createBrowserRouter, Navigate } from 'react-router-dom';

import GeneralLayout from './layout/GeneralLayout';
import DetailInfo from './pages/DetailInfoPage/DetailInfo';
import EditReview from './pages/editReviewPage/EditReview';
import EventList from './pages/eventListPage/EventList';
import Main from './pages/mainPage/Main';
import Signin from './pages/SignPage/Signin';
import Signup from './pages/SignPage/Signup';

interface RouterElement {
  id: number;
  path: string;
  element: React.ReactNode;
  withAuth: boolean;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    element: <Main />,
    withAuth: false,
  },
  {
    id: 1,
    path: '/signin',
    element: <Signin />,
    withAuth: false,
  },
  {
    id: 2,
    path: '/signup',
    element: <Signup />,
    withAuth: false,
  },
  {
    id: 3,
    path: '/event',
    element: <EventList />,
    withAuth: false,
  },
  {
    id: 4,
    // FIXME: 아마 동적세그먼트 포함시켜야 할 것
    path: '/event/detail',
    element: <DetailInfo />,
    withAuth: false,
  },
  {
    id: 5,
    path: '/review/edit',
    element: <EditReview />,
    withAuth: true,
  },
];

export const routers = createBrowserRouter(
  routerData.map((router) => {
    const token = localStorage.getItem('token');
    if (!token && router.withAuth) {
      return {
        path: router.path,
        element: <Navigate to="/signin" />,
      };
    }
    return {
      path: router.path,
      element: <GeneralLayout>{router.element}</GeneralLayout>,
    };
  })
);
