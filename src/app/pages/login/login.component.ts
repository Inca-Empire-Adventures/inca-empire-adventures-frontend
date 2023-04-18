import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserReq } from 'src/app/shared/model/auth/user-req';
import { UserService } from 'src/app/shared/services/auth/user.service';
//import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credenciales: UserReq = new UserReq('', '');
  isRegisterPage: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    this.isRegisterPage = this.route.snapshot.url[0].path === 'register';
  }

  login() {
    // Validar el formulario
    if (this.credenciales.username && this.credenciales.password) {
      // TODO: realizar la lógica de autenticación con el servidor
      // Si el usuario y la contraseña son correctos, redirigir a la página principal
      console.log('user req login: ', this.credenciales);
      this.userService.login(this.credenciales).subscribe(
        (response) => {
          // Guardar el token en el almacenamiento local
          sessionStorage.setItem('tokenAccess', response.access);
          sessionStorage.setItem('tokenRefresh', response.refresh);
          sessionStorage.setItem('username', this.credenciales.username);
          this.router.navigate(['/']);
        },
        (err) => {
          alert('Credenciales invalidas');
        }
      );
    } else {
      // Si el formulario no es válido, mostrar un mensaje de error
      alert('Por favor ingrese un usuario y una contraseña válidos.');
    }
  }

  register() {
    if (this.credenciales.username && this.credenciales.password) {
      this.userService.register(this.credenciales).subscribe(
        (response) => {
          alert('Usuario registrado exitosamente');
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          alert('Error al registrar usuario');
        }
      );
    } else {
      alert('Por favor ingrese un usuario y una contraseña válidos.');
    }
  }
}
