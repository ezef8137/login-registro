import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClienteComponent } from './login-cliente/login-cliente.component';
import { VistaClienteComponent } from './vista-cliente/vista-cliente.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { MenuComponent } from './menu/menu.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';

const routes: Routes = [
{path:'registro-cliente',component: RegistroClienteComponent},
{path:'recuperar-contrasena',component: RecuperarContrasenaComponent},
{path:'login-cliente',component:LoginClienteComponent},
{path:'vista-cliente',component:VistaClienteComponent,},
{path:'menu-cliente',component: MenuComponent},
{ path: '', redirectTo: '/menu-cliente', pathMatch: 'full' },
{ path: '**', redirectTo: '/menu-cliente'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
