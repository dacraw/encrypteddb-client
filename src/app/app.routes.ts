// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
// import { HomeComponent } from './home/home.component';
// import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', canActivate: [MsalGuard] },
];

// import { Routes } from '@angular/router';

// export const routes: Routes = [];
