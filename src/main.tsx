import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import '@fontsource/days-one'
import '@fontsource/montserrat'
import './index.css'

const container = document.getElementById('root')!;

// Gunakan hydrateRoot untuk SSR/SSG, fallback ke createRoot jika diperlukan
if (import.meta.env.DEV) {
  createRoot(container).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  hydrateRoot(
    container,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
