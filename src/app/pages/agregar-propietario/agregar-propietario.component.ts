import { Component, OnInit } from '@angular/core';

/*---usar ruta---*/
import { Router } from "@angular/router"

/*---localizacion--*/
import { Location } from '@angular/common';

/*------usar FormGroup-------*/
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

/*-----conectar servicio-----*/
import { ConjuntoService } from '../../servicios/conjunto.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-agregar-propietario',
  templateUrl: './agregar-propietario.component.html',
  styleUrls: ['./agregar-propietario.component.css']
})

export class AgregarPropietarioComponent implements OnInit {

   NuevoRegistro:FormGroup;

  constructor( private conectarServicio: ConjuntoService, private fb:FormBuilder, private localizacion:Location,  private usarRuta:Router ) { 

    this.NuevoRegistro = this.fb.group({

      nombre:       [ "",  [ Validators.required, Validators.minLength(10) ] ],
      edad:         [ "",  [ Validators.required, Validators.maxLength(2) ] ],
      cedula:       [ "",  [ Validators.required, Validators.minLength(6), Validators.maxLength(10) ] ],
      correo:       [ "" , [ Validators.required, Validators.minLength(12)] ],
      celular:      [ "",  [ Validators.required, Validators.minLength(10) ]  ],
      torre:        [ "",  [ Validators.required, Validators.maxLength(2)] ],
      apartamento:  [ "",  [ Validators.required, Validators.minLength(3), Validators.maxLength(4)] ],
      parqueadero:  [ "",   Validators.required ],
      deuda:        [ "",  [ Validators.required, Validators.maxLength(7) ] ]

    })

  }


  ngOnInit(): void {
  }

  /*--------validacion visual-------------*/
  get errorNombre(){

 
    return this.NuevoRegistro.controls['nombre'].invalid && this.NuevoRegistro.controls['nombre'].touched;
    
  }

  get errorEdad(){
    return this.NuevoRegistro.controls['edad'].invalid && this.NuevoRegistro.controls['edad'].touched;
  }

  get errorCedula(){
    return this.NuevoRegistro.controls['cedula'].invalid && this.NuevoRegistro.controls['cedula'].touched;
  }

  get errorCorreo(){
    return this.NuevoRegistro.controls['correo'].invalid && this.NuevoRegistro.controls['correo'].touched;
  }

  get errorCelular(){
    return this.NuevoRegistro.controls['celular'].invalid && this.NuevoRegistro.controls['celular'].touched;
  }

  get errorTorre(){
    return this.NuevoRegistro.controls['torre'].invalid && this.NuevoRegistro.controls['torre'].touched;
  }

  get errorApartamento(){
    return this.NuevoRegistro.controls['apartamento'].invalid && this.NuevoRegistro.controls['apartamento'].touched;
  }

  get errorParqueadero(){
    return this.NuevoRegistro.controls['parqueadero'].invalid && this.NuevoRegistro.controls['parqueadero'].touched;
  }

  get errorDeuda(){
    return this.NuevoRegistro.controls['deuda'].invalid && this.NuevoRegistro.controls['deuda'].touched;
  }



  registrarFormulario(){

    if( this.NuevoRegistro.invalid ){

      Object.values( this.NuevoRegistro.controls ).forEach( valores => {
        
        valores.markAsTouched();


      })

    }else{

      console.log( this.NuevoRegistro );
      this.conectarServicio.registrarUsuario( this.NuevoRegistro )
      .subscribe( resp => {
            console.log( resp );

            Swal.fire(
              '¡Muy Bien!',
              '¡Se registro correctamente!',
              'success'
            )

            this.NuevoRegistro.reset();
            
            this.usarRuta.navigate( ['/propietarios'] );
         
          }, (err) => {
            console.log(err)

            alert("El asuario con este correo o numero de cedula ya existe")
          })

    }

  }


  


  volver_a_tabla(){
  
    this.localizacion.back();

  }




}
