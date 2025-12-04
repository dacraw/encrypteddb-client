import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', canActivate: [MsalGuard], component: Home },
];

