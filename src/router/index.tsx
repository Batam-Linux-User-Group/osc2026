import { createBrowserRouter } from 'react-router-dom';
import FormRegister from '../pages/FormRegisterPage';
import LandingPage from '../pages/LandingPage';
import LeaderboardPage2 from '../pages/LeaderboardPage2';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';
import NotFoundPage from '../pages/NotFoundPage';


const router = createBrowserRouter(
  [
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
      element: <LeaderboardPage2 />,
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
  ],
  {
    basename: import.meta.env.VITE_BASE_PATH || '',
  }
);

export default router;
