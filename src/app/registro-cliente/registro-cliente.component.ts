import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../servicio/usuario';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Service } from '../servicio/service.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.css',
})
export class RegistroClienteComponent {

  FormularioUsuario: FormGroup;
  constructor(private formulario: FormBuilder,private location: Location,
    private Service: Service,
    private ToastrService: ToastrService,
    private router: Router) { 
      this.FormularioUsuario = this.formulario.group({
        nombre: ['',Validators.required],
        apellido: ['',Validators.required],
        dni: ['',Validators.required],
        telefono: ['',Validators.required],
        correo: ['',Validators.required],
        clave: ['',Validators.required]
      });
    }
    ngOnInit():void{}

    goBack(): void {
      this.location.back();
    }

    registrarUsuario(): any {
      const usuario = new Usuario();
      usuario.nombre = this.FormularioUsuario.value.nombre;
      usuario.apellido = this.FormularioUsuario.value.apellido;
      usuario.dni = this.FormularioUsuario.value.dni;
      usuario.telefono = this.FormularioUsuario.value.telefono;
      usuario.correo = this.FormularioUsuario.value.correo;
      usuario.clave = this.FormularioUsuario.value.clave;

      console.log("presionaste")
      console.log(this.FormularioUsuario.value)
      console.log(usuario)
      if (!usuario.nombre || !usuario.apellido || !usuario.dni || !usuario.telefono || !usuario.correo || !usuario.clave) {
        // Mostrar alerta utilizando Toastr
        this.ToastrService.error('Por favor, complete todos los campos', 'Error');
        return;
      }

      if (usuario.validarCorreoElectronico()) {
        console.log("El formato del correo electrónico es válido.");
        
        this.Service.registrarUsuario(usuario).subscribe((response) => {
          console.log("Respuesta del servicio:", response);
          if (response.success === 1) {
            // Si el registro es exitoso, redirige al usuario al componente de inicio de sesión
            this.ToastrService.success("Registro exitoso");
            this.router.navigateByUrl("login-cliente");
          } else {
            // Si el registro falla debido a correo o DNI duplicado, muestra un mensaje de error
            this.ToastrService.error(response.message);
          }
        },
        (error) => {
          console.error("Error al enviar los datos:", error);
          // Manejar otros errores aquí
        });
      } else {
        console.log("El formato del correo electrónico no es válido.");
        // Aquí podrías mostrar un mensaje al usuario indicando que el formato del correo es incorrecto
      }
    } 
}
