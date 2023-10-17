import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { selectCurrentUser } from './features/auth/services/authSlice';
import GeneralLayout from './layout/GeneralLayout';
import BookmarkShare from './pages/BookmarkShare';
import DetailInfo from './pages/DetailInfo/DetailInfo';
import EditEvent from './pages/EditEvent/EditEvent';
import EditReview from './pages/EditReview/EditReview';
import EventList from './pages/EventList/EventList';
import Main from './pages/Main/Main';
import ManagePage from './pages/ManagePage/ManagePage';
import MyPage from './pages/MyPage/MyPage';
import NotFound from './pages/NotFound/NotFound';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ReviewDetail from './pages/ReviewDetail/ReviewDetail';
import Reviews from './pages/Reviews/Reviews';
import Signin from './pages/Sign/Signin';
import Signup from './pages/Sign/Signup';

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
    path: '/review/edit/:id',
    element: <EditReview />,
    withAuth: true,
    wrapWithLayout: true,
  },
  {
    id: 6,
    path: '/review/:id',
    element: <ReviewDetail />,
    withAuth: false,
    wrapWithLayout: true,
  },
  {
    id: 7,
    path: '*',
    element: <NotFound />,
    withAuth: false,
    wrapWithLayout: false,
  },
  {
    id: 8,
    path: '/password-reset/:id',
    element: <ResetPassword />,
    withAuth: false,
    wrapWithLayout: true,
  },
  {
    id: 9,
    path: '/managepage',
    element: <ManagePage />,
    //추후에 true로 변경
    withAuth: false,
    wrapWithLayout: true,
  },
  {
    id: 10,
    path: '/mypage/*',
    element: <MyPage />,
    //추후에 true로 변경
    withAuth: false,
    wrapWithLayout: true,
  },
  {
    id: 11,
    path: '/bookmark-share/:id',
    element: <BookmarkShare />,
    withAuth: false,
    wrapWithLayout: false,
  },
  {
    id: 12,
    path: '/review',
    element: <Reviews />,
    withAuth: false,
    wrapWithLayout: true,
  },
  {
    id: 13,
    path: '/event/edit',
    element: <EditEvent type="add" />,
    withAuth: true,
    wrapWithLayout: true,
  },
  {
    id: 14,
    path: '/event/edit/:id',
    element: <EditEvent type="edit" />,
    withAuth: true,
    wrapWithLayout: true,
  },
  {
    id: 15,
    path: '/review/modify/:id',
    element: <EditReview type="modify" />,
    withAuth: true,
    wrapWithLayout: true,
  },
];

export const Router = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <Routes>
      {routerData.map((router) => {
        if (!user && router.withAuth) {
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
