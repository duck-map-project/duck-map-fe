import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthContext } from './contexts/AuthContext';
import GeneralLayout from './layout/GeneralLayout';
import DetailInfo from './pages/DetailInfoPage/DetailInfo';
import EditReview from './pages/editReviewPage/EditReview';
import EventList from './pages/eventListPage/EventList';
import Main from './pages/mainPage/Main';
// import MyBookmark from './pages/MyPage/MyBookmark';
import NotFound from './pages/NotFoundPage/NotFound';
import Signin from './pages/SignPage/Signin';
import Signup from './pages/SignPage/Signup';

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
    path: '/event/:id',
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
  // {
  //   id: 6,
  //   path: '/mypage',
  //   element: <MyPage />,
  //   withAuth: true,
  //   wrapWithLayout: true,
  // },
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
  return (
    <Routes>
      {routerData.map((router) => {
        if (!auth?.isLogin && router.withAuth) {
          return (
            <Route
              key={router.id}
              path={router.path}
              element={<Navigate to="/signin" />}
            />
          );
        }
        if (router.wrapWithLayout) {
          return (
            <Route
              key={router.id}
              path={router.path}
              element={<GeneralLayout>{router.element}</GeneralLayout>}
            />
          );
        }
        return (
          <Route key={router.id} path={router.path} element={router.element} />
        );
      })}
    </Routes>
  );
};
