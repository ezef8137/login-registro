import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario'; // Importa tu clase Empleado

@Injectable({
  providedIn: 'root'
})
export class Service {
  apiUrl:String = 'http://localhost/usuarios/'; // Reemplaza con la URL real de tu API

  constructor(private http: HttpClient) { }

  registrarUsuario(datosUsuarios: Usuario): Observable<any> {
    return this.http.post(this.apiUrl+"?registro=1", datosUsuarios);
  }

  iniciarSesion(formulario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}?login=1`, formulario);
  }

  borrarEmpleado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/borrar-empleado/${id}`);
  }

  recuperarContrasena(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recuperar`, { email });
  }
}
