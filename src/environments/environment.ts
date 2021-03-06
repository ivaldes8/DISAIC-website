// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_DISAIC_URL: 'http://www.back.disaic.cu/public/api',
  API_DISAIC_IMG_URL: 'http://www.back.disaic.cu/public/storage/images',
  API_DISAIC_IMG_URL2: 'http://127.0.0.1:8000/storage/images/',
  API_testing_URL: 'http://127.0.0.1/appBackend/public/api',
  OTHER: 'http://192.168.137.1/appBackend/public/api',
  OTHER2: 'http://127.0.0.1:8000/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
