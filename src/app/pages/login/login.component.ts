import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms"


/*---conectar servicio----*/
import { ConjuntoService } from '../../servicios/conjunto.service';

/*-----usar ruta----*/
import { Router } from "@angular/router"




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formulario:FormGroup;

  constructor(private usarRuta:Router, private conectarServicio:ConjuntoService,  private fb:FormBuilder) { 

    this.formulario = this.fb.group({

      email:     [ "", [  Validators.required, Validators.minLength(5) ] ],
      password:  ["",  [  Validators.required, Validators.minLength(5)  ] ]

    })
    
  }


  /*----validacion visual----*/

  get emailVacio(){
    return this.formulario.controls['email'].invalid && this.formulario.controls['email'].touched;
  }

  get passVacio(){
    return this.formulario.controls['password'].invalid && this.formulario.controls['password'].touched
  }

  ngOnInit(): void {
    
  }
  



  formLogin(){

    if( this.formulario.invalid ){
      

      Object.values( this.formulario.controls ).forEach( valores => {

        valores.markAsTouched();

      })
      
    }else{


      console.log(this.formulario);


      this.conectarServicio.autenticarLogin( this.formulario )
              .subscribe( (respLogin) => {
              
                console.log( respLogin );

                this.usarRuta.navigate( [ '/home' ] )
               
              }, (err=> {
                  

                console.log(err.error.mensaje)
                

                if( err.error.mensaje == "el correo no existe" ){

                  alert("El email no es valido")
                }


                if( err.error.mensaje == "la contraseña es incorrecta" ){

                  alert("La contraseña no es valida")
                }

              }) )
      

    }
    
  }
}
