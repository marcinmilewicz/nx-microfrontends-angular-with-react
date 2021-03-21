import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { MicrofrontendsModule } from '@nx-microfrontends/microfrontends-utils';

import { AppComponent } from './app.component';
import { MICRO_APPS_LINKS_CONFIGURATION_URL } from './app.model';
import { routes } from './app.routes';
import { ConfigurationService } from './configuration.service';

export function initializeConfiguration(
  configurationService: ConfigurationService
): () => Promise<void> {
  return () => configurationService.initialize();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MicrofrontendsModule.withConfiguration(
      './assets/configs/microapp-config.json',
      routes
    ),
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: MICRO_APPS_LINKS_CONFIGURATION_URL,
      useValue: './assets/configs/routeLinks-config.json',
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfiguration,
      multi: true,
      deps: [ConfigurationService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router) {
    console.log('Router shell', router.config);
  }
}
