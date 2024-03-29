import { lazy } from 'react';

/**
 * @typedef {Object} RouteObject
 * @property {string} [path] - O caminho da URL para a rota.
 * @property {boolean} [index] - Se true, define a rota como uma rota de índice.
 * @property {React.ReactNode} [children] - Componentes filhos da rota.
 * @property {boolean} [caseSensitive] - Se true, a correspondência de rota é sensível a maiúsculas e minúsculas.
 * @property {string} [id] - Um identificador único para a rota.
 * @property {LoaderFunction} [loader] - Uma função para carregar dados antes de renderizar a rota.
 * @property {ActionFunction} [action] - Uma função para lidar com ações POST, PUT, DELETE na rota.
 * @property {React.ReactNode | null} [element] - O componente React a ser renderizado quando a rota é acessada.
 * @property {React.ReactNode | null} [hydrateFallbackElement] - Elemento de fallback para quando a rota é hidratada.
 * @property {React.ReactNode | null} [errorElement] - Elemento a ser renderizado em caso de erro na rota.
 * @property {React.ComponentType | null} [Component] - Um componente React opcional.
 * @property {React.ComponentType | null} [HydrateFallback] - Um componente de fallback de hidratação.
 * @property {React.ComponentType | null} [ErrorBoundary] - Um componente de limite de erro.
 * @property {RouteObject["handle"]} [handle] - Um manipulador personalizado para a rota.
 * @property {ShouldRevalidateFunction} [shouldRevalidate] - Função que determina se a rota deve ser revalidada.
 */

const routeConfig = [
  {
    path: '/',
    component: lazy(() => import('@/views/home')),
  },
  {
    path: '/about',
    component: lazy(() => import('@/views/about')),
  },
  {
    path: '/contact',
    component: lazy(() => import('@/views/contact')),
  },
];

export default routeConfig;
