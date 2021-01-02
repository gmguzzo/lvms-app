import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ErrorComponent } from './error/error.component';

export const SessionsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        data: { title: 'Signin' }
      },
      {
        path: 'error',
        component: ErrorComponent,
        data: { title: 'Error' }
      }
    ]
  }
];
