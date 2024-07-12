import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { PropietariosComponent } from './pages/propietarios/propietarios.component';
import { AgregarPropietarioComponent } from './pages/agregar-propietario/agregar-propietario.component';
import { EditarComponent } from './pages/editar/editar.component';
import { InformacionComponent } from "./pages/informacion/informacion.component"

/*---usar guard---*/
import { ValidarGuard } from './guard/validar.guard';


const routes: Routes = [ 

 
  { path: "login",          component: LoginComponent   },
  { path: "registro",       component: RegistroComponent },
  { path: "home",           component: HomeComponent, canActivate:[ ValidarGuard ] },
  { path: "propietarios",   component: PropietariosComponent, canActivate:[ ValidarGuard ] },
  { path: "agregarNuevo",   component: AgregarPropietarioComponent, canActivate: [ ValidarGuard ] },
  { path: "actualizar/:id",     component: EditarComponent, canActivate: [ ValidarGuard ] },
  { path: "verInformacion/:id", component: InformacionComponent, canActivate: [ ValidarGuard ] },

  { path: "**", pathMatch:"full", redirectTo:"agregarNuevo" }

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:true }  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
