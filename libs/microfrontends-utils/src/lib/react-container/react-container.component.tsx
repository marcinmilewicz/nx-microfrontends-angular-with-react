import { Component, Input, OnInit } from '@angular/core';
import { MicrofrontendsService } from './../microfrontends.service';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

@Component({
  selector: 'micro-react-container',
  template: '<div [id]="rootId"></div>',
})
export class ReactContainerComponent<Props> implements OnInit {
  @Input() remote: string;
  @Input() component: string;
  @Input('props') set setProps(props: Props) {
    setTimeout(() => this.renderComponent(props));
  }

  readonly rootId = 'component-root-id';

  constructor(private microfrontendsService: MicrofrontendsService) {}

  ngOnInit() {
    if (!this.remote || !this.component) {
      throw new TypeError('"remote" and "component" parameter are required');
    }
  }

  private renderComponent(props: Partial<Props>) {
    const LoadedComponent = React.lazy(() =>
      this.microfrontendsService.loadRemote(this.remote, this.component)
    );

    ReactDOM.render(
      <React.Suspense fallback="Loading Component">
        <LoadedComponent {...props}></LoadedComponent>
      </React.Suspense>,
      document.getElementById(this.rootId)
    );
  }
}
