import { Component, Input } from '@angular/core';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { CoreSharedService } from 'libs/shared-core-services/src/index';

@Component({
  selector: 'foo-test-container',
  templateUrl: './foo-test.component.html',
  styleUrls: ['./foo-test.component.css'],
})
export class FooTestComponent {
  @Input() appName: string;
  @Input() moduleName: string;

  constructor(public coreSharedService: CoreSharedService) {}
}
