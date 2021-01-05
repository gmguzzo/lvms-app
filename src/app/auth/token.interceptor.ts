import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { JwtAuthService } from '../shared/services/auth/jwt-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
  private token: string | undefined;
  private refreshTokenInProgress = false;
  // tslint:disable-next-line:no-any
  private refreshTokenSubject = new Subject<any>();
  // tslint:disable-next-line:no-any
  private authService: any;

  constructor(private inj: Injector, private router: Router) {
    this.refreshTokenSubject.next(null);
    this.authService = this.inj.get(JwtAuthService);
  }

  // tslint:disable-next-line:no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (req.urlWithParams.includes('token=test')) {
          return throwError(error);
        }

        if (req.url.includes('token')) {
          if (this.refreshTokenInProgress) {
            this.logoutUser();
          }
          return throwError(error);
        }

        if (error && error.status === 401) {
          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(req)))
            );
          } else {
            return this.handle401Error(req, next);
          }
        }
        return throwError(error);
      })
    );
  }


  // tslint:disable-next-line:no-any
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    const refreshToken = this.authService.getRefreshToken();

    if (!refreshToken) {
      this.router.navigate(['/']).then();
    }

    this.refreshTokenInProgress = true;

    // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
    this.refreshTokenSubject.next(null);

    return this.refreshAccessToken().pipe(
      switchMap((data) => {
        if (data.accessToken) {
          this.authService.setToken(data.accessToken);
          this.authService.setRefreshToken(data.refreshToken);
          this.refreshTokenSubject.next(true);
          return next.handle(this.addAuthenticationToken(request));
        }
        this.logoutUser();
        return EMPTY;
      }),
      // When the call to refreshToken completes we reset the refreshTokenInProgress to false
      // for the next time the token needs to be refreshed
      finalize(() => {
        this.refreshTokenInProgress = false;
      })
    );
  }

  // tslint:disable-next-line:no-any
  private refreshAccessToken(): Observable<any> {
    const http = this.inj.get(HttpClient);
    const authorization = 'Basic ' + btoa('USERDASH:');
    const body = {
      grantType: 'refresh_token',
      refreshToken: this.authService.getRefreshToken()
    };
    const baseUrlToken = environment.apiUrl + 'token';
    // tslint:disable-next-line:no-any
    return http.post<any>(baseUrlToken, body, {
      headers: new HttpHeaders().set('Authorization', authorization)
    });
  }

  private logoutUser() {
    this.authService.signout();
    return EMPTY;
  }

  // tslint:disable-next-line:no-any
  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    const authService = this.inj.get(JwtAuthService);
    this.token = authService.getJwtToken();

    if (!this.token) {
      return request;
    }
    let excludeTokenInterceptor;
    if (request.url.indexOf('token') > 0) {
      excludeTokenInterceptor = true;
    } else {
      excludeTokenInterceptor = request.url.indexOf('svg') > 0;
    }

    if (excludeTokenInterceptor) {
      return request;
    }

    // If you are calling an outside domain then do not add the token.
    if (!request.url.match(/.collact.com.br\//)) {
      return request;
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token)
    });
  }
}
