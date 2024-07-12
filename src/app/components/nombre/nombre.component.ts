import { Component, OnInit } from '@angular/core';

/*---conectar servicio---*/
import { ConjuntoService } from '../../servicios/conjunto.service';


/*----usar ruta----*/
import { Router } from "@angular/router"



@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.css']
})
export class NombreComponent implements OnInit {

  nombrePersona:string = ""

  constructor(private usarRuta:Router, private conectarServicio:ConjuntoService ) { }

  ngOnInit(): void {

    /*----traer nombre----*/
    console.log( this.conectarServicio.guardarNombre );


    if (window.matchMedia("(max-width: 600px)").matches) {
  
       /* La pantalla tiene menos de 600 píxeles de ancho */
       this.nombrePersona = this.conectarServicio.guardarNombre;
      
    } else {
      
       /* La pantalla tiene al menos 600 píxeles de ancho */
       this.nombrePersona = ""
    }

  
    
      

  }

  cerrarSesion(){

    this.conectarServicio.destruirToken();
    this.usarRuta.navigate( ['/login'] );
  
  }

}
