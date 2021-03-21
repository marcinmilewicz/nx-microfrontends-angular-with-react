import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
