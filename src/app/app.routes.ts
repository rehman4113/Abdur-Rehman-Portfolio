import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'work/manio',
    loadComponent: () => import('./features/manio-case-study/manio-case-study-page').then(m => m.ManioCaseStudyPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];