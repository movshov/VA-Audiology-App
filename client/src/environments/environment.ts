// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

import {
  enableDebugTools,
  disableDebugTools
} from '@angular/platform-browser';
import {
  ApplicationRef,
  enableProdMode
} from '@angular/core';
/**
 * Environment Providers
 */
let PROVIDERS: any[] = [
  /**
   * Common env directives
   */
];

/**
 * Angular debug tools in the dev console
 * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
 */
let _decorateModuleRef = <T>(value: T): T => { return value; };

// if ('production' === ENV) {
//   enableProdMode();

//   /**
//    * Production
//    */
//   _decorateModuleRef = (modRef: any) => {
//     disableDebugTools();

//     return modRef;
//   };

//   PROVIDERS = [
//     ...PROVIDERS,
//     /**
//      * Custom providers in production.
//      */
//   ];

// } else {

//   _decorateModuleRef = (modRef: any) => {
//     const appRef = modRef.injector.get(ApplicationRef);
//     const cmpRef = appRef.components[0];

//     enableDebugTools(cmpRef);
//     return modRef;
//   };

//   /**
//    * Development
//    */
//   PROVIDERS = [
//     ...PROVIDERS,
//     /**
//      * Custom providers in development.
//      */
//   ];

// }

export const decorateModuleRef = _decorateModuleRef;

export const ENV_PROVIDERS = [
  ...PROVIDERS
];


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
