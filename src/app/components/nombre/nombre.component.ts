import { Component, OnInit, Input } from '@angular/core';

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


  @Input() nombreADMIN:any


  constructor(private usarRuta:Router, private conectarServicio:ConjuntoService ) { }

  ngOnInit(): void {

  

  
      

  }

  cerrarSesion(){

    this.conectarServicio.destruirToken();
    this.usarRuta.navigate( ['/login'] );
  
  }

}
