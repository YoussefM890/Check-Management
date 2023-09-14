import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized response here. You can run your function.
          // For example, you can navigate to a login page.
          // Alternatively, you can call a function to perform some specific action.
          this.handleUnauthorizedResponse();
        }
        return throwError(error);
      })
    );
  }

  private handleUnauthorizedResponse() {
    this.authService.logout();
    // Implement your logic for handling unauthorized responses here.
    // For example, you can navigate to a login page.
    // Or, you can call a specific function.
  }
}
