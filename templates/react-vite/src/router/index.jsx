import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/app/Home';
import Loading from '@/app/Loading';
import Counter from '@/app/Counter';

const routeConfig = [
  {
    path: '/',
    element: <Home />,
    exact: true /*, children: [], index: false */,
  },
  { path: '/counter', element: <Counter /> },
  { path: '/loading', element: <Loading /> },
];

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {routeConfig.map((route, index) => (
          <Route element={route.element} key={index} path={route.path} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
