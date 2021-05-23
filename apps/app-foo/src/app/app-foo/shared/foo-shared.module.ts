import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooTestComponent } from './test/foo-test.component';
import { SharedComponentsModule } from '@nx-microfrontends/shared-components';

@NgModule({
  declarations: [FooTestComponent],
  imports: [CommonModule, SharedComponentsModule],
  exports: [FooTestComponent],
})
export class FooSharedModule {}
