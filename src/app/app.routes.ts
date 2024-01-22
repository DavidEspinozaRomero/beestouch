import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts').then((m) => m.StarterLayoutComponent),
    children: [
      {
        path: 'landing',
        loadComponent: () =>
          import('./modules').then((m) => m.LandingComponent),
      },
      {
        path: '',
        loadComponent: () => import('./modules').then((m) => m.HomeComponent),
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import('./modules').then((m) => m.LoginComponent),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./modules').then((m) => m.RegisterComponent),
          },
          {
            path: 'restore-password',
            loadComponent: () =>
              import('./modules').then((m) => m.RestorePasswordComponent),
          },
        ],
      },
      {
        path: 'cart',
        loadComponent: () => import('./modules').then((m) => m.CartComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./modules').then((m) => m.ContactComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./modules').then((m) => m.ProductsComponent),
      },
      {
        path: 'detail-product/:id',
        loadComponent: () =>
          import('./modules').then((m) => m.DetailProductComponent),
      },
      {
        path: 'payments',
        loadComponent: () =>
          import('./modules').then((m) => m.PaymentsComponent),
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./modules').then((m) => m.PrivacyPolicyComponent),
      },
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      {
        path: '**',
        loadComponent: () =>
          import('./modules').then((m) => m.NotFoundComponent),
      },
    ],
  },
];
