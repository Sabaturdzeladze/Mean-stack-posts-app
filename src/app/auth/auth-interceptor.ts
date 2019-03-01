import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      // set doesn't overwrite all the headers
      headers: req.headers.set('authorization', "Bearer " + authToken)
      // authorization key is case insensitive
    });
    return next.handle(authRequest);
  }
}
