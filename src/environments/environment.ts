// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  vmUrl: 'https://vm08.htl-leonding.ac.at',
  mqttUrl: 'mqtt.htl-leonding.ac.at',
  corePathPrefix: '',
  mqttPathPrefix: '/broker',
  mqttPath: '/mqtt',
  mqttPort: 5055,
  vmPort: 8080,
  pathPrefix: '/m.eder3/frontend'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
