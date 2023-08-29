import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import SidebarLayoutUser from 'src/layouts/SidebarLayoutUser';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import Enseignant from './content/pages/Enseignant';
import Classe from './content/pages/Classe';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Etudiant = Loader(lazy(() => import('src/content/pages/Etudiant')));

const routes: RouteObject[] = [
  {
    path: 'Classes/Etudiant',
    element: <Etudiant />
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: 'clients',
        element: <Enseignant />
        // element: <Clients />
      },

      {
        path: 'Classes',
        // element: <Produits />
        element: <Classe />
      },
      // {
      //   path: '/Etudiant',
      //   element: <Etudiant />
      // }
    ]
  },
  {
    path: '',
    element: <Navigate to="dashboards/Clients" replace />
  }
];

export default routes;
