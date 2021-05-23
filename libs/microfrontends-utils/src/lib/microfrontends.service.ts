import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import {
  AngularRemoteModule,
  BASE_ROUTES,
  loadRemoteModule,
  MICRO_APPS_CONFIGURATION_URL,
  RemoteModule,
} from './microfrontends.model';

import { buildRoutes } from './route-utils';

const hashRemoteModule = ({
  remoteName,
  exposedModule,
}: Omit<RemoteModule, 'remoteEntry'>): string =>
  `${remoteName}_${exposedModule}`;

@Injectable()
export class MicrofrontendsService {
  private readonly remotes: Map<string, RemoteModule> = new Map();

  constructor(
    @Inject(MICRO_APPS_CONFIGURATION_URL) private configurationUrl: string,
    @Inject(BASE_ROUTES) private baseRoutes: Routes,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  initialize(): Promise<void> {
    return this.httpClient
      .get(this.configurationUrl)
      .toPromise()
      .then(
        ({
          angularRemotes,
          remotes,
        }: {
          angularRemotes: AngularRemoteModule[];
          remotes: RemoteModule[];
        }) => {
          this.loadAndBuildAngularRoutes(angularRemotes);
          this.registerRemotes(remotes);

          return Promise.resolve();
        }
      );
  }

  loadRemote<T>(remoteName: string, exposedModule: string): Promise<T> {
    const remoteModuleKey: string = hashRemoteModule({
      exposedModule,
      remoteName,
    });

    if (!this.remotes.has(remoteModuleKey)) {
      return Promise.reject(`No remote module named ${remoteName} registered`);
    }

    return loadRemoteModule(this.remotes.get(remoteModuleKey));
  }

  private loadAndBuildAngularRoutes(modules: AngularRemoteModule[]) {
    const routes = buildRoutes(modules, this.baseRoutes, loadRemoteModule);

    this.router.resetConfig(routes);
  }

  private registerRemotes(modules: RemoteModule[]) {
    modules.forEach((remoteModule: RemoteModule) =>
      this.remotes.set(hashRemoteModule(remoteModule), remoteModule)
    );
  }
}
