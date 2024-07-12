import { Component, OnInit } from '@angular/core';

/*---router---*/ /*--recibir parametro--*/
import { Router, ActivatedRoute } from "@angular/router"


/*-----localizacion---*/
import { Location } from '@angular/common';

/*---usar formGroup---*/
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


/*-----conectar servicios-----*/
import { ConjuntoService } from '../../servicios/conjunto.service';

import Swal from 'sweetalert2'



@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  
  formularioEditar: FormGroup;

  cargarDatosForm:any;

  constructor( private recibirParametro:ActivatedRoute, private conectarServicios:ConjuntoService, private fb:FormBuilder, private localizacion:Location,  private usarRuta:Router ) {

    this.formularioEditar = this.fb.group({

      actualizarNombre:         [ "",  [ Validators.required, Validators.minLength(10) ] ],
      actualizarEdad  :         [ "",  [ Validators.required, Validators.maxLength(2) ] ],
      actualizarCedula :        [ "",  [ Validators.required, Validators.minLength(6), Validators.maxLength(10) ] ],
      actualizarCorreo :        [ "" , [ Validators.required, Validators.minLength(12)] ],
      actualizarContacto:       [ "",  [ Validators.required, Validators.minLength(10) ]  ],
      actualizarTorre:          [ "",  [ Validators.required, Validators.maxLength(2)] ],
      actulizarApartamento:     [ "",  [ Validators.required, Validators.minLength(3), Validators.maxLength(4)] ],
      actulizarParqueadero:     [ "",   Validators.required ],
      actulizarDeuda :          [ "",  [ Validators.required, Validators.maxLength(7) ] ]

    })

   }

  ngOnInit(): void {
    
     this.recibirParametro.params.subscribe( parametro => {
      console.log( parametro['id'] );

      this.traerDatosUsuario( parametro['id'] )

     })
   
  }
  

  /*----------------traer datos----------------*/
  traerDatosUsuario(id:any){
        this.conectarServicios.traerUnregistro( id )
          .subscribe( (resp:any) => {
            console.log(resp.todoElUsuario[0]);
            this.cargarDatosForm = resp.todoElUsuario[0];


            this.formularioEditar = this.fb.group({
              actualizarNombre : this.cargarDatosForm.nombre,
              actualizarEdad   : this.cargarDatosForm.edad,
              actualizarCedula : this.cargarDatosForm.cedula,
              actualizarCorreo : this.cargarDatosForm.correo,
              actualizarContacto : this.cargarDatosForm.celular,
              actualizarTorre : this.cargarDatosForm.torre,
              actulizarApartamento: this.cargarDatosForm.apartamento,
              actulizarParqueadero : this.cargarDatosForm.parqueadero,
              actulizarDeuda : this.cargarDatosForm.deuda
            })
          
          
        })
  }
  /*----------------traer datos-----------------*/




   /*--------validacion visual-------------*/
   get errorNombre(){
    return this.formularioEditar.controls['actualizarNombre'].invalid && this.formularioEditar.controls['actualizarNombre'].touched;
  }

  get errorEdad(){
    return this.formularioEditar.controls['actualizarEdad'].invalid && this.formularioEditar.controls['actualizarEdad'].touched;
  }

  get errorCedula(){
    return this.formularioEditar.controls['actualizarCedula'].invalid && this.formularioEditar.controls['actualizarCedula'].touched;
  }

  get errorCorreo(){
    return this.formularioEditar.controls['actualizarCorreo'].invalid && this.formularioEditar.controls['actualizarCorreo'].touched;
  }

  get errorCelular(){
    return this.formularioEditar.controls['actualizarContacto'].invalid && this.formularioEditar.controls['actualizarContacto'].touched;
  }

  get errorTorre(){
    return this.formularioEditar.controls['actualizarTorre'].invalid && this.formularioEditar.controls['actualizarTorre'].touched;
  }

  get errorApartamento(){
    return this.formularioEditar.controls['actulizarApartamento'].invalid && this.formularioEditar.controls['actulizarApartamento'].touched;
  }

  get errorParqueadero(){
    return this.formularioEditar.controls['actulizarParqueadero'].invalid && this.formularioEditar.controls['actulizarParqueadero'].touched;
  }

  get errorDeuda(){
    return this.formularioEditar.controls['actulizarDeuda'].invalid && this.formularioEditar.controls['actulizarDeuda'].touched;
  }
  






/*-----------enviar la actualizacion del registro------------*/
  enviarActualizacion(){


   if( this.formularioEditar.invalid ){
    
    Object.values( this.formularioEditar.controls ).forEach( valores => {
    
      valores.markAsTouched();
    
      })

   }else{
      

    //console.log( this.formularioEditar );

    this.recibirParametro.params.subscribe( parametro => {
      console.log( parametro['id'] );

      this.conectarServicios.actualizarUsuario(  this.formularioEditar, parametro['id'] )
                        .subscribe( resp => {
                          console.log( resp );
                          

                          Swal.fire(
                            '¡Muy bien!',
                            'Los datos se actualizaron correctamente',
                            'success'
                          )

                          this.usarRuta.navigate( ['/propietarios'] )

                        } )
    
    })        

   }

  }

  /*-----------enviar la actualizacion del registro------------*/








  volver_table(){

    this.localizacion.back();

  }
}
