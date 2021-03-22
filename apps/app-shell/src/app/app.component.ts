import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from './configuration.service';

@Component({
  selector: 'nx-microfrontends-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app-shell';

  props;

  constructor(
    private configurationService: ConfigurationService,
    private router: Router
  ) {
    const routes = configurationService.getRouteLinks();
    const onRouteClick = (item: { name; path }) => {
      this.router.navigateByUrl(item.path);
    };

    this.props = { routes, onRouteClick };
  }
}
