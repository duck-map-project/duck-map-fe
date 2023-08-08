import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import GeneralLayout from './layout/GeneralLayout';
import BookmarkShare from './pages/BookmarkShare/BookmarkShare';
import DetailInfo from './pages/DetailInfoPage/DetailInfo';
import EditReview from './pages/editReviewPage/EditReview';
import EventList from './pages/eventListPage/EventList';
import Main from './pages/mainPage/Main';
import ManagePage from './pages/ManagePage/Manage';
import MyPage from './pages/MyPage/MyPage';
import NotFound from './pages/NotFoundPage/NotFound';
import ResetPassword from './pages/ResetPasswordPage/ResetPassword';
import ReviewDetail from './pages/ReviewDetail/ReviewDetail';
import Reviews from './pages/Reviews/Reviews';
import Signin from './pages/SignPage/Signin';
import Signup from './pages/SignPage/Signup';
import { selectCurrentUser } from './redux/auth/authSlice';

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
