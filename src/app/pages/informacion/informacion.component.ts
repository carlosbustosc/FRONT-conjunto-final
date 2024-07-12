import { Component, OnInit } from '@angular/core';

import { Location } from "@angular/common"


/*-----------recibir parametro-----------*/
import { ActivatedRoute } from "@angular/router"

/*--------conectar servicio---------*/
import { ConjuntoService } from '../../servicios/conjunto.service';



@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  informacionPersona:any;

  constructor( private recibirParametro: ActivatedRoute, private conectarServicio:ConjuntoService,  private localizacion:Location ) { }

  ngOnInit(): void {

    this.recibirParametro.params.subscribe( parametro => {
      console.log(parametro['id']);

      this.consultarInformacion( parametro['id'] )
    })
  }



/*----consultar informacion persona----*/
consultarInformacion( id:any ){  

  this.conectarServicio.traerUnregistro( id )
      
  .subscribe( (resp:any) => {
        console.log(resp.todoElUsuario[0]);

        this.informacionPersona = resp.todoElUsuario[0];
      
      })
    
}

/*----consultar informacion persona----*/


  volver_tabla(){

    this.localizacion.back();

  }

}
