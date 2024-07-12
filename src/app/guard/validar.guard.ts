import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


/*-----conectar Servicio-----*/
import { ConjuntoService } from '../servicios/conjunto.service';

/*----usar ruta----*/
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class ValidarGuard implements CanActivate {

  constructor( private usarRuta:Router,  private conectarServicio: ConjuntoService){}


  canActivate() {
     
    if( this.conectarServicio.validarToken() ){
      
      return true;

    }else{
      
      this.usarRuta.navigate( [ 'login' ] )
      return false;
    
    }
   
  }
  
}
