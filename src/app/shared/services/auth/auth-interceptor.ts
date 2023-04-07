import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token de acceso de la sesión de almacenamiento local
    const token = sessionStorage.getItem('tokenAccess');

    // Clonar la solicitud y agregar el token JWT al encabezado de autenticación
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    // Continuar la cadena de interceptores y devolver el resultado
    return next.handle(authReq);
  }
}
