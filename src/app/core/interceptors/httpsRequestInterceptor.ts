import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
        if (req.method === 'POST') {
            const dupReq = req.clone({headers: req.headers.set('key', '#ASDFGW#ERWQERTRYT#%$%$@#$%==.')});
            return next.handle(dupReq);
        }else{
            const requestClone = req.clone({});
            return next.handle(requestClone);
        }
    }
}