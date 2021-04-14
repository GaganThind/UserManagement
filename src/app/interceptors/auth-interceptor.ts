import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("token");

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + idToken)
            });
            console.log("http Interceptor");
            
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
    
}
function tap(arg0: (event: any) => void, arg1: (error: any) => void): import("rxjs").OperatorFunction<HttpEvent<any>, HttpEvent<any>> {
    throw new Error("Function not implemented.");
}

