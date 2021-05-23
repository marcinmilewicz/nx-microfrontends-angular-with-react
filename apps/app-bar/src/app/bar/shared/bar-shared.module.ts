import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarTestComponent } from './test/bar-test.component';
import { SharedComponentsModule } from '@nx-microfrontends/shared-components';

@NgModule({
  declarations: [BarTestComponent],
  imports: [CommonModule, SharedComponentsModule],
  exports: [BarTestComponent],
})
export class BarSharedModule {}
