import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { useAuthContext } from './contexts/AuthContext';
import GeneralLayout from './layout/GeneralLayout';
import DetailInfo from './pages/DetailInfoPage/DetailInfo';
import EditReview from './pages/editReviewPage/EditReview';
import EventList from './pages/eventListPage/EventList';
import Main from './pages/mainPage/Main';
import NotFound from './pages/NotFoundPage/NotFound';
import Signin from './pages/SignPage/Signin';
import Signup from './pages/SignPage/Signup';
import MyBookmark from './pages/MyPage/MyBookmark';

interface RouterElement {
  id: number;
  path: string;
  element: React.ReactNode;
  withAuth: boolean;
  wrapWithLayout: boolean;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    element: <Main />,
    withAuth: false,
    wrapWithLayout: true,
  },
  {
    id: 1,
    path: '/signin',
    element: <Signin />,
    withAuth: false,
    wrapWithLayout: true,
  },
  {
    id: 2,
    path: '/signup',
    element: <Signup />,
    withAuth: false,
    wrapWithLayout: true,
  },
  {
    id: 3,
    path: '/event',
    element: <EventList />,
    withAuth: false,
    wrapWithLayout: true,
  },
  {
    id: 4,
    // FIXME: 아마 동적세그먼트 포함시켜야 할 것
    path: '/event/detail',
    element: <DetailInfo />,
    withAuth: false,
    wrapWithLayout: true,
  },
  {
    id: 5,
    path: '/review/edit',
    element: <EditReview />,
    withAuth: true,
    wrapWithLayout: true,
  },
  {
    id: 6,
    path: '/mypage/bookmark',
    element: <MyBookmark />,
    withAuth: true,
    wrapWithLayout: false,
  },
  {
    id: 7,
    path: '*',
    element: <NotFound />,
    withAuth: false,
    wrapWithLayout: false,
  },
];

export const Router = () => {
  const auth = useAuthContext();
  const routers = createBrowserRouter(
    routerData.map((router) => {
      if (!auth?.isLogin && router.withAuth) {
        return {
          path: router.path,
          element: <Navigate to="/signin" />,
        };
      }
      if (router.wrapWithLayout) {
        return {
          path: router.path,
          element: <GeneralLayout>{router.element}</GeneralLayout>,
        };
      }
      return {
        path: router.path,
        element: router.element,
      };
    })
  );
  return <RouterProvider router={routers} />;
};
