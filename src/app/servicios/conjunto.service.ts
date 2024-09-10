import { Injectable } from '@angular/core';

/*---usar HttpClient----*/
import { HttpClient } from "@angular/common/http"


/*----usar map----*/
import { map } from "rxjs/operators"
import { pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ConjuntoService {
  
  Token:any = ""
  guardarNombre:any = ""
 

  

  constructor( private usarHttp: HttpClient ) {
    
    this.leerToken()

  }


/*-----------------------------registrar login------------------------------*/

registrarLogin( registro:any ){
  
  const datos = {
      nombre   : registro.controls['nombre'].value,
      correo   : registro.controls['correo'].value,
      pass1    : registro.controls['pass1'].value,
      //volverSecureToken : true 
  }
  

  return this.usarHttp.post("https://back-natura.onrender.com/registro", datos);
  /*
  return this.usarHttp.post( `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbebNy_xgwv3GeG7JKeiIDGCOJ1eOpEiM`, datos );
  */

}


autenticarLogin( formularioLogin:any ){
  
  const login = {

    correo :    formularioLogin.controls['email'].value,
    pass1 :     formularioLogin.controls['password'].value,
    //volverSecureToken: true

  }

  console.log(login)

  return this.usarHttp.post("https://back-natura.onrender.com/login", login)
          .pipe(
            map( (resp:any ) => {
                console.log(resp.respuestaBaseDatos.nombre)

                this.Token = resp.Token
                this.guardarToken()
                this.guardarNombre = resp.respuestaBaseDatos.nombre

                return resp
            })
          )
  
  /*
  return this.usarHttp.post( `http://localhost:5000/login`, login )
                      .pipe(
                          map( (resp:any) => {
                            
                            this.Token = resp.localId
                            this.guardarToken()

                             this.guardarNombre = resp.displayName 
               
                            return resp
                            
                          })
                      )
                      */

}



guardarToken(){

  localStorage.setItem( 'token', this.Token );

}


leerToken(){
  
  if( localStorage.getItem('token') ){
    
    this.Token = localStorage.getItem('token');
  
  }else{
    
    this.Token = " ";
  }
 

}


validarToken(){
  
   return  this.Token.length > 2
  
}



destruirToken(){

  localStorage.removeItem('token');
}

/*----------------------------------registrar login--------------------------*/






/*---------------------------registrar propietario----------------------------*/

registrarUsuario( registro:any ){
  
  const usuario = {

      nombre:       registro.controls['nombre'].value,  
      edad:         registro.controls['edad'].value,  
      cedula:       registro.controls['cedula'].value,  
      correo:       registro.controls['correo'].value,   
      celular:      registro.controls['celular'].value,   
      torre:        registro.controls['torre'].value,   
      apartamento:  registro.controls['apartamento'].value,
      parqueadero:  registro.controls['parqueadero'].value,
      deuda:        registro.controls['deuda'].value,
   
      
  }
    
  return this.usarHttp.post('https://back-natura.onrender.com/propietarios', usuario)


  /*--
  return this.usarHttp.post(`https://conjunto-79c93-default-rtdb.firebaseio.com/conjunto.json`, usuario)
                      .pipe(
                        map( (resp:any) => {
                            
                          return resp;
                        
                          })
                      )
                    */

  
}


/*------mostrar propietarios-------*/
mostrarUsuarios(){
  
  return this.usarHttp.get('https://back-natura.onrender.com/mostrarPropietarios');
  
  /*
  return this.usarHttp.get(`https://conjunto-79c93-default-rtdb.firebaseio.com/conjunto.json`)
              .pipe(
                map( (resp:any) => {

                let nuevoArrUsuario:any = [];
                  
                  Object.keys( resp ).forEach( llave => {

                    let usuario =  resp[llave]
                    usuario.id  = llave;
                    nuevoArrUsuario.push(usuario);

                  })
                
                  return nuevoArrUsuario;

                })
              )
            */

}





/*------------------actualizar---------------*/

/*--traer un propietario---*/

traerUnregistro(idT:any){
  
  
  return this.usarHttp.get(`https://back-natura.onrender.com/unPropietario/${ idT }`)
  
  
}




/*---actualizar propietario---*/
actualizarUsuario( datoActualizar:any, id:any ){
  
  //console.log( datoActualizar )

  const actualizarDatos = {

      nombre:       datoActualizar.controls['actualizarNombre'].value,  
      edad:         datoActualizar.controls['actualizarEdad'].value,  
      cedula:       datoActualizar.controls['actualizarCedula'].value,  
      correo:       datoActualizar.controls['actualizarCorreo'].value,   
      celular:      datoActualizar.controls['actualizarContacto'].value,   
      torre:        datoActualizar.controls['actualizarTorre'].value,   
      apartamento:  datoActualizar.controls['actulizarApartamento'].value,
      parqueadero:  datoActualizar.controls['actulizarParqueadero'].value,
      deuda:        datoActualizar.controls['actulizarDeuda'].value,
  }

  //delete actualizarDatos.id;
  
  return this.usarHttp.put(`https://back-natura.onrender.com/actualizarPropietario/${ id  }`, actualizarDatos)
  

  /*
  return this.usarHttp.put(`https://conjunto-79c93-default-rtdb.firebaseio.com/conjunto/${ id }.json`, actualizarDatos );
  */

}


actualizarDeuda( datos:any, deudaTotal:any, Id:any ){
    
  const DatosDeuda = {
    ...datos
  }
  
  DatosDeuda.todoElUsuario[0].deuda = deudaTotal
  console.log( DatosDeuda.todoElUsuario[0]  )
  console.log(Id)


  

  return this.usarHttp.put(`https://back-natura.onrender.com/actualizarDeuda/${ Id }`, DatosDeuda.todoElUsuario[0] )
  /*-
  return this.usarHttp.put(`https://conjunto-79c93-default-rtdb.firebaseio.com/conjunto/${ Id }.json`, DatosDeuda);
  */

}













/*-------------borrar registro--------------*/
borrarRegistro( id:any ){
  
  
  return this.usarHttp.delete(`https://back-natura.onrender.com/borrarPropietario/${id}`);
  
   // return this.usarHttp.delete( `https://conjunto-79c93-default-rtdb.firebaseio.com/conjunto/${ id }.json` );
    

}


}


