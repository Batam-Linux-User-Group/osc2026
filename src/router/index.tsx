import { createBrowserRouter } from 'react-router-dom';
import FormRegister from '../pages/FormRegisterPage';
import LandingPage from '../pages/LandingPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';
import NotFoundPage from '../pages/NotFoundPage';

export const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/daftar',
    element: <FormRegister />,
  },
  {
    path: '/leaderboard',
    element: <LeaderboardPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASE_PATH || '',
});

export default router;
