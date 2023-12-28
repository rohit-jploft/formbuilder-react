import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import AddForm from 'src/pages/addForm';
import DashboardLayout from 'src/layouts/dashboard';
import { isAuthenticated } from 'src/utils/authHelper';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const PreviewForm = lazy(() => import('src/pages/PreviewForm'));

// ----------------------------------------------------------------------

export default function Router() {
  const isAuthenticationDone = isAuthenticated();
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: isAuthenticationDone ? <IndexPage /> : <Navigate to="/login" />, index: true },
        { path: 'user', element: isAuthenticationDone ? <UserPage /> : <Navigate to="/login" /> },
        {
          path: 'add-form',
          element: isAuthenticationDone ? <AddForm /> : <Navigate to="/login" />,
        },
        {
          path: '/edit-form/:id',
          element: isAuthenticationDone ? <AddForm /> : <Navigate to="/login" />,
        },
      
      ],
    },
    {
      path: 'login',
      element: isAuthenticationDone ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: 'form/preview/:formId',
      element: <PreviewForm />,
    },

    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
