import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes'; 

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

  protectedResourceMap.set(
    protectedResources.graphMe.endpoint,
    protectedResources.graphMe.scopes
  );

  protectedResourceMap.set(
    protectedResources.encryptedApi.endpoint,
    protectedResources.encryptedApi.scopes
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

bootstrapApplication(App, {
  providers: [

    provideRouter(routes),

    provideHttpClient(
      withInterceptorsFromDi()
    ),

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

    MsalService,
    MsalGuard,
    MsalBroadcastService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
}).catch(err => console.error(err));
