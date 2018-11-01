// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faUser,
  faCog,
  faUserCog,
  faSignIn,
  faSignOut,
  faList,
  faInfoSquare,
  faEdit,
  faTrash,
  faCalendar,
  faPlus
} from '@fortawesome/pro-light-svg-icons';

library.add(faHome);
library.add(faUser);
library.add(faCog);
library.add(faUserCog);
library.add(faSignIn);
library.add(faSignOut);
library.add(faList);
library.add(faInfoSquare);
library.add(faEdit);
library.add(faTrash);
library.add(faCalendar);
library.add(faPlus);

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
