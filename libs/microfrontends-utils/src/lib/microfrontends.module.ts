import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import {
  BASE_ROUTES,
  MICRO_APPS_CONFIGURATION_URL,
} from './microfrontends.model';
import { MicrofrontendsService } from './microfrontends.service';
import { ReactContainerComponent } from './react-container/react-container.component';

export function initializeMicrofrontends(
  microfrontendsService: MicrofrontendsService
): () => Promise<void> {
  return () => microfrontendsService.initialize();
}

@NgModule({
  declarations: [ReactContainerComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [ReactContainerComponent],
})
export class MicrofrontendsModule {
  static withConfiguration(
    microAppsConfigurationUrl: string,
    routes: Routes
  ): ModuleWithProviders<MicrofrontendsModule> {
    return {
      ngModule: MicrofrontendsModule,
      providers: [
        MicrofrontendsService,
        {
          provide: MICRO_APPS_CONFIGURATION_URL,
          useValue: microAppsConfigurationUrl,
        },
        {
          provide: BASE_ROUTES,
          useValue: routes,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeMicrofrontends,
          multi: true,
          deps: [MicrofrontendsService],
        },
      ],
    };
  }

  constructor() {}
}
