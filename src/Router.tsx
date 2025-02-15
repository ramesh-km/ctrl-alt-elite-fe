import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/login/Login.page';
import RegisterPage from './pages/register/Register.page';
import TransferPage from './pages/transfer/Transfer.page';
import http from './utils/http';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/:accountNumber/transfer',
    element: <TransferPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
