import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { SpinnerService } from './services/spinner/spinner.service';
import { ErrorService } from './services/error/error.service';
import { ApiService } from './services/api/api.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

     constructor(
      private spinnerService: SpinnerService,
      private apiService: ApiService,
      private errorService: ErrorService
      ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(req)
             .pipe(tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse && req.method === "GET") {
                        this.spinnerService.hide();
                    }
                    this.errorService.displayErrorMsg();
                }, (error) => {
                    this.spinnerService.hide();
                }));
    }
}
