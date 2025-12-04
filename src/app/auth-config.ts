// src/app/auth-config.ts (or directly in your environment.ts/app.module.ts)

import { LogLevel, Configuration, BrowserCacheLocation, PublicClientApplication } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1; // Set this to \"true\" if you are supporting IE

export const msalConfig: Configuration = {
  auth: {
    // Replace with your Application (Client) ID
    clientId: 'ad501fb4-b3bf-45e6-a279-b054bede2647',
    // Replace with your Directory (Tenant) ID or 'common' for multi-tenant
    authority: 'https://login.microsoftonline.com/c4eb6f86-2026-439f-98d3-b12fb45fe191',
    // This must match one of the redirect URIs in your App Registration (usually http://localhost:4200)
    redirectUri: 'http://localhost:4200',
  },
  cache: {
    // 'localStorage' is generally preferred for MSAL v2/v3/v4
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE, // Set to true if you are supporting IE
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      piiLoggingEnabled: false
    }
  }
};

/**
 * Add scopes for the resources you want to access.
 * e.g., "user.read" for Microsoft Graph.
 */
export const protectedResources = {
  encryptedApi: {
    endpoint: "https://localhost:7135/",
    scopes: ["api://591f85d3-23fd-4c5b-948e-251db428ee79/user_impersonation"]
  },
  graphMe: {
    endpoint: "https://graph.microsoft.com/v1.0/me",
    scopes: ["user.read"]
  }
}

export const loginRequest = {
  scopes: ["user.read"] // Default scopes for login
};