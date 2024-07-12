import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*------importar formularios por template------*/
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/*---importar HttpeClientModule-----*/
import { HttpClientModule } from "@angular/common/http"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { PropietariosComponent } from './pages/propietarios/propietarios.component';
import { AgregarPropietarioComponent } from './pages/agregar-propietario/agregar-propietario.component';
import { EditarComponent } from './pages/editar/editar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { NombreComponent } from './components/nombre/nombre.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PropietariosComponent,
    AgregarPropietarioComponent,
    EditarComponent,
    NavbarComponent,
    InformacionComponent,
    NombreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
