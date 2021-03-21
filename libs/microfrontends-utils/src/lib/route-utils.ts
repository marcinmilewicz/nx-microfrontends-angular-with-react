import { Routes } from '@angular/router';
import { AngularRemoteModule, RemoteModule } from './microfrontends.model';

export function buildRoutes(
  angularRemoteModules: AngularRemoteModule[],
  baseRoutes: Routes,
  moduleLoader: (module: RemoteModule) => Promise<any>
): Routes {
  const lazyRoutes: Routes = angularRemoteModules.map(
    (module: AngularRemoteModule) => ({
      path: module.routePath,
      loadChildren: () =>
        moduleLoader(module).then((m) => m[module.ngModuleName]),
    })
  );

  return [...baseRoutes, ...lazyRoutes];
}
