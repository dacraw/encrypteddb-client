// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes'; // Assuming you have an app.routes.ts file

import {
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration,
  MSAL_INSTANCE,
  MsalBroadcastService,
} from '@azure/msal-angular';
import {
  InteractionType,
  PublicClientApplication,
  IPublicClientApplication,
} from '@azure/msal-browser';
import { msalConfig, loginRequest, protectedResources } from './app/auth-config'; // Assuming you kept the config in auth-config.ts

// --- MSAL Factory Functions (Same as before) ---

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest,
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  // Map your protected API endpoints and their required scopes
  protectedResourceMap.set(
    protectedResources.graphMe.endpoint,
    protectedResources.graphMe.scopes
  );

  return {
    interactionType: InteractionType.Redirect, // Or Popup
    protectedResourceMap,
  };
}

bootstrapApplication(App, {
  providers: [
    // 1. Core Angular providers
    provideRouter(routes),
    // Use withInterceptors() to provide the MsalInterceptor
    provideHttpClient(
      withInterceptors([
        // This is where you would include the MsalInterceptor, but MSAL has its own
        // implementation using HTTP_INTERCEPTORS which is simpler to use here.
      ])
    ),

    // 2. MSAL Instance and Config Providers
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },

    // 3. MSAL Services (Provided at the root level)
    MsalService,
    MsalGuard,
    MsalBroadcastService,

    // 4. MsalInterceptor (The Interceptor needs to be provided separately)
    // In Angular Standalone, providing the interceptor requires this format.
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
}).catch(err => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));
