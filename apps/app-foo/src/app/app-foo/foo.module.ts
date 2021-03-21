import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooRoutingModule } from './foo-routing.module';

@NgModule({
  imports: [CommonModule, FooRoutingModule],
})
export class FooModule {}
