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

  constructor(private conectarServicio:ConjuntoService ) { }

  ngOnInit(): void {

    if( localStorage.getItem( 'token' ) ){
      
      this.mostrarIngreso = true;

    }else{

      this.mostrarIngreso = false;
      
    
    }
 

  }




}
