import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', loadComponent:
      () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'economic-indicators', loadComponent:
      () => import('./pages/economic-indicators/economic-indicators').then(m => m.EconomicIndicators)
  },
  { path: '**', redirectTo: 'dashboard' }
];