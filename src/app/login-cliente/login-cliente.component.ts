import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService para mostrar notificaciones
import { Service } from '../servicio/service.service';
import { Router } from '@angular/router';
import { Usuario } from '../servicio/usuario';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent {
  FormularioLogin: FormGroup;
  constructor(
    private location: Location,
    private formulario: FormBuilder,
    private Service: Service,
    private toastr: ToastrService, // Inyecta ToastrService en el constructor
    private router: Router
  ) {
    this.FormularioLogin = this.formulario.group({
      correo: [''],
      clave: ['']
    });
  }
  goBack(): void {
    this.location.back();
  }

  iniciarSesion(): void {
    const usuario = new Usuario();
    usuario.correo = this.FormularioLogin.value.correo;
    usuario.clave = this.FormularioLogin.value.clave;
    const formulario = this.FormularioLogin.value;
    if (!usuario.correo || !usuario.clave) {
      // Mostrar alerta utilizando Toastr
      this.toastr.error('Por favor, complete todos los campos', 'Error');
      return;
    }
    this.Service.iniciarSesion(formulario).subscribe(
      (response) => {
        if (response.success === 1) {
          // Si la autenticación es exitosa, redirige al usuario al componente 'vista-cliente'
          this.toastr.success('Inicio de sesión exitoso', 'Éxito');
          this.router.navigateByUrl("vista-cliente");
        } else {
          // Si la autenticación falla, muestra un mensaje de error
          this.toastr.error(response.message, 'Error');
        }
      },
      (error) => {
        console.error(error);
        // Si hay un error en la solicitud, muestra un mensaje de error genérico
        this.toastr.error('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.', 'Error');
      }
    );
  }
  
}
