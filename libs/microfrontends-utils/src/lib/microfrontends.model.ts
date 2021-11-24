import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';

export const BASE_ROUTES = new InjectionToken<Routes>('baseRoutes');
export const MICRO_APPS_CONFIGURATION_URL = new InjectionToken<string>(
  'configurationUrl'
);

export type AngularRemoteModule = RemoteModule & {
  displayName: string;
  routePath: string;
  ngModuleName: string;
};

type Scope = unknown;
type Factory = () => any;

type Container = {
  init(shareScope: Scope): void;
  get(module: string): Factory;
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

const moduleMap = {};
const remoteMap = {};

function loadRemoteEntry(remoteEntry: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (moduleMap[remoteEntry]) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = remoteEntry;

    script.onerror = reject;

    script.onload = () => {
      moduleMap[remoteEntry] = true;
      resolve(); // window is the global namespace
    };

    document.body.append(script);
  });
}

let isDefaultScopeInitialized = false;

async function lookupExposedModule<T>(
  remoteName: string,
  exposedModule: string
): Promise<T> {
  // Do we still need to initialize the share scope?
  if (!isDefaultScopeInitialized) {
    await __webpack_init_sharing__('default');
    isDefaultScopeInitialized = true;
  }

  const container = window[remoteName] as Container;

  if (!remoteMap[remoteName]) {
    await container.init(__webpack_share_scopes__.default);
    remoteMap[remoteName] = true;
  }

  const factory = await container.get(exposedModule);

  return factory() as T;
}

export type RemoteModule = {
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
};

export async function loadRemoteModule<T>(module: RemoteModule): Promise<T> {
  await loadRemoteEntry(module.remoteEntry);

  return await lookupExposedModule<T>(module.remoteName, module.exposedModule);
}
