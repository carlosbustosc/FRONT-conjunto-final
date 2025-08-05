import { Component, OnInit } from '@angular/core';

/*---conectar servicios----*/
import { ConjuntoService } from '../../servicios/conjunto.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mostrarIngreso = false;
  nombrePersona:string  = ""

  nombreAdministrador:any

  constructor(private conectarServicio:ConjuntoService ) { }

  ngOnInit(): void {

  
    if( localStorage.getItem('nombreAdmin') ){
        
       this.nombreAdministrador = localStorage.getItem('nombreAdmin');
       console.log(this.nombreAdministrador)
   
      }else{

        this.nombreAdministrador = ""
    }
   


    if( localStorage.getItem( 'token' ) ){
      
      this.mostrarIngreso = true;

    }else{

      this.mostrarIngreso = false;
      
    
    }
 

  }




}
