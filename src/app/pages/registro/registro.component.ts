import { Component, OnInit } from '@angular/core';

/*----forms-----*/
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

/*---conectar servicios---*/
import { ConjuntoService } from 'src/app/servicios/conjunto.service';


/*---usar ruta---*/
import { Router } from "@angular/router"

import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  registro:FormGroup;

  constructor(private conectarServicio:ConjuntoService,  private fb:FormBuilder, private usarRuta:Router ) { 

    this.registro = this.fb.group({

      nombre : ["",  [ Validators.required, Validators.minLength(5) ] ],
      correo : ["",  [ Validators.required, Validators.minLength(4) ] ],
      pass1  : ["",  [ Validators.required, Validators.minLength(6) ] ],
      pass2  : ["",  [ Validators.required, Validators.minLength(6) ] ]

    })

  }

  /*----validaciones visuales---*/
    get nombreVacio(){
      return this.registro.controls['nombre'].invalid && this.registro.controls['nombre'].touched
    }

    get correoVacio(){
      return this.registro.controls['correo'].invalid && this.registro.controls['correo'].touched
    }

    get passVacio(){
      return this.registro.controls['pass1'].invalid && this.registro.controls['pass1'].touched
    }

    get pass2Vacio(){
      const valor1 = this.registro.controls['pass1'].value;
      const valor2 = this.registro.controls['pass2'].value;

      if( valor1 == valor2 ){

        return false;

      }else{

        return true;

      }

    }


  ngOnInit(): void {
  }

  enviarFormulario(){

    if( this.registro.invalid ){
      
      Object.values( this.registro.controls ).forEach( valores => {
       
        valores.markAsTouched();

      })

    }else{

      console.log( this.registro )
      
      this.conectarServicio.registrarLogin( this.registro )
         .subscribe( resp => {

            console.log(resp);

            Swal.fire(
              '¡Muy bien!',
              'Se registro correctamente',
              'success'
            )

            this.registro.reset();

            this.usarRuta.navigate(['/login']);

          }, (err => {
                alert(err.error.error.message)
              
          }))
   
    }
  }

}
