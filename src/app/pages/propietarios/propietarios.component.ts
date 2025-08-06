import { Component, OnInit } from '@angular/core';

/*---usar ruta----*/
import { Router } from "@angular/router"; 

/*-----localizacion---*/
import { Location } from '@angular/common';

/*----conectar servicios----*/
import { ConjuntoService } from '../../servicios/conjunto.service';

/*----usar formularios reactivos-----*/
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";

import { deudaModel } from '../../models/deuda.model';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.css']
})

export class PropietariosComponent implements OnInit {


  cerrarDeuda = false;
  propietariosRegistrados:any[] = [];

  guardarDeudaAnterior:any = [];

  guardarId:any;

  guardardeudaTotal:any;

  guardarTokenId:any;

  habilitarBoton = true;

  detalleDeuda:any = {}

  
  mostrarFomulario:boolean = true;
  mostrarDetalle:boolean = false;


  datosPersona:any = {}

  guardarIdPersona:any;


  botonGuardarDeuda = true;


  




  /*-----------formulario por template-----------*/
  formularioDeuda:deudaModel = new deudaModel();
  

  constructor( private usarRuta: Router, private conectarServicio: ConjuntoService, private fb:FormBuilder ) { 
      

  }



  /*-------------TODOS LOS REGISTROS-----------*/
  ngOnInit(): void {


    this.conectarServicio.mostrarUsuarios()
    .subscribe( (resp:any) => {
          
          console.log(resp)
          
          console.log(resp)
          
          this.propietariosRegistrados = resp.todosLosPropietarios;
        
        })

    
   

  }







/*---------------------RUTAS----------------------*/
  agregar_nuevo(){
      
    this.usarRuta.navigate( ['/agregarNuevo'] )
  }


  volver_home(){

    this.usarRuta.navigate( ['/home'] );
  
  }



  actualizar( id:any ){

    this.usarRuta.navigate( ['/actualizar', id] );
    
  }



  /*-----borrar registro------*/
  borrarRegistro( id:any, i:number ){
    

   this.propietariosRegistrados.splice(1, 0)

    Swal.fire({
      title: '¿Esta seguro?',
      text: "¿Quiere borrar este registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          
        //console.log(id);
       this.conectarServicio.borrarRegistro( id )
       .subscribe(resp => {
         console.log(resp);

         /*--borrar posicion--*/
         this.propietariosRegistrados.splice( i, 1 );
         

       })



        Swal.fire(
          '¡Muy bien!',
          'Se ha borrado correctamente',
          'success'
        )

      }
    })

     
  }


/*-------------ver un infromacion de un registro-------------*/
  ver_informacion(id:any){
  
    
    this.usarRuta.navigate( ['/verInformacion', id] );
  
  }








/*---------------------------------administrar deuda-----------------------------*/
  abrirDeuda( id:number ){
  


    this.formularioDeuda.total = ""

    this.cerrarDeuda = true;

    this.guardarIdPersona = id;
    console.log(id);
    
    
    

    this.conectarServicio.traerUnregistro( id )
         .subscribe( (resp:any) => {
            console.log( resp );
            

            this.guardarDeudaAnterior = resp.todoElUsuario[0].deuda;


            this.formularioDeuda.anterior = this.guardarDeudaAnterior;
            this.formularioDeuda.id = id;
            
            this.datosPersona = resp;
         
          })
           
  }






/*---------select sumar automatico--------*/
sumar_deuda( parametro:any ){
  
  this.botonGuardarDeuda = true;
  


 let valor1 = parseInt( parametro.target.value );
 let valor2 = parseInt( this.guardarDeudaAnterior );


 let sumarDeudas = valor1 + valor2;
 //console.log( parseInt(valor1) + parseInt(valor2) );
  
 this.guardardeudaTotal = sumarDeudas;


/*------llenar formulario------*/
this.formularioDeuda.total = this.guardardeudaTotal;



}



/*---------registrar deuda-----------*/
registrar_deuda( formulario:any ){
  
   /*---crear total e id -----*/
   this.datosPersona.total = this.formularioDeuda.total;
   this.datosPersona.id    = this.guardarIdPersona;




   console.log( this.datosPersona.total );


   /**----actualizar usuario------- */
    this.conectarServicio.actualizarDeuda( this.datosPersona, this.datosPersona.total, this.datosPersona.id )
         
    .subscribe( resp => {
          console.log( resp );

          this.cerrarDeuda = false;

          Swal.fire(
            '¡Muy bien!',
            'La deuda se actualizo correctamente',
            'success'
          )
    

          


         })
         
                  
}






  icono_cerrar(){{

    this.cerrarDeuda = false;

  }}

}
