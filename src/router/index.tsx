import { createBrowserRouter } from 'react-router-dom';
import FormRegister from '../pages/FormRegisterPage';
import LandingPage from '../pages/LandingPage';
import LeaderboardPage from '../pages/LeaderboardPage';
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
      element: <LeaderboardPage />,
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
