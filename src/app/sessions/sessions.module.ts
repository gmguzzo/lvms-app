import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SessionsRoutes } from './sessions.routing';
import { ErrorComponent } from './error/error.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [
    SigninComponent,
    ErrorComponent
  ],
  imports: [
    PerfectScrollbarModule,
    RouterModule.forChild(SessionsRoutes),
    SharedModule,
    CommonModule
  ]
})
export class SessionsModule {
}
