import { Component, Input } from '@angular/core';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { CoreSharedService } from 'libs/shared-core-services/src/index';

@Component({
  selector: 'bar-test-container',
  templateUrl: './bar-test.component.html',
  styleUrls: ['./bar-test.component.css'],
})
export class BarTestComponent {
  @Input() appName: string;
  @Input() moduleName: string;

  constructor(public coreSharedService: CoreSharedService) {}
}
