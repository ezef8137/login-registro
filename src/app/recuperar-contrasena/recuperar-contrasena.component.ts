// recuperar-contrasena.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Service } from '../servicio/service.service';
@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
  formularioRecuperacion!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: Service
  ) { }

  ngOnInit(): void {
    this.formularioRecuperacion = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviarCorreo(): void {
    if (this.formularioRecuperacion.invalid) {
      this.toastr.error('Ingrese un correo electrónico válido', 'Error');
      return;
    }

    const email = this.formularioRecuperacion.value.email;
    this.service.recuperarContrasena(email).subscribe(
      response => {
        if (response.success) {
          this.toastr.success('Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña', 'Éxito');
        } else {
          this.toastr.error('No se pudo enviar el correo electrónico de recuperación. Por favor, inténtelo de nuevo más tarde', 'Error');
        }
      },
      error => {
        console.error(error);
        this.toastr.error('Ocurrió un error al enviar el correo electrónico de recuperación', 'Error');
      }
    );
  }
}
