import { InjectionToken } from '@angular/core';

export const MICRO_APPS_LINKS_CONFIGURATION_URL = new InjectionToken(
  'microAppsLinksConfigurationUrl'
);

export interface RouteLink {
  name: string;
  path: string;
  children?: RouteLink;
}
