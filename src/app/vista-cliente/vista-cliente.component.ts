import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrl: './vista-cliente.component.css'
})
export class VistaClienteComponent {
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    // Deshabilita el botón de retroceso del navegador
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function() {
      window.history.pushState(null, "", window.location.href);
    };
  }

  cerrarSesion(){
    this.router.navigateByUrl("login-cliente");
  }

}


