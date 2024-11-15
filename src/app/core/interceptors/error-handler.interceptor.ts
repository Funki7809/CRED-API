import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * Interceptor that handles HTTP errors globally.
 *
 * This interceptor catches HTTP errors in the application and formats the error message accordingly.
 * If the error is a client-side or network error (an instance of `ErrorEvent`), it returns the error message.
 * If the error is a server-side error (an `HttpErrorResponse`), it returns the error code and message.
 * The error message is then thrown using `throwError` for further handling or logging.
 *
 * @param {HttpRequest<any>} req - The outgoing HTTP request that is being intercepted.
 * @param {HttpHandler} next - The next HTTP handler to pass the request to, allowing the chain to continue.
 * 
 * @returns {Observable<never>} An observable that emits the error message if an error occurs.
 * The `catchError` operator is used to catch and handle the error response.
 *
 * @example
 * // The interceptor is automatically triggered by Angular's HTTP client.
 * // No need to call it directly, but here's how it would be used in context:
 * this.httpClient.get('some-api-url').subscribe({
 *   next: data => console.log(data),
 *   error: error => console.error('Caught error:', error)
 * });
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error code: ${error.status}, message: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }));
};
