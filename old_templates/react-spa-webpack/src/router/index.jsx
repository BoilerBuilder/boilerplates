import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routeConfig from './routes';

// Criando o roteador
const router = createBrowserRouter(
  routeConfig.map(({ path, component: Component, ...rest }) => ({
    path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    ),
    ...rest,
  })),
);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
