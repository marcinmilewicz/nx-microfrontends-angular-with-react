import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MICRO_APPS_LINKS_CONFIGURATION_URL, RouteLink } from './app.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  private readonly routeLinks: RouteLink[] = [];

  constructor(
    @Inject(MICRO_APPS_LINKS_CONFIGURATION_URL)
    private configurationUrl: string,
    private httpClient: HttpClient
  ) {}

  initialize(): Promise<void> {
    return this.httpClient
      .get(this.configurationUrl)
      .toPromise()
      .then(({ links }: { links: RouteLink[] }) =>
        links.forEach((link) => this.routeLinks.push(link))
      );
  }

  getRouteLinks() {
    return this.routeLinks;
  }
}
