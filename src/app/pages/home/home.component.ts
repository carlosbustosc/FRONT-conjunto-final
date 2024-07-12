import { Component, OnInit } from '@angular/core';

/*----usar ruta---*/
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usarRuta: Router) { }

  ngOnInit(): void {
  }

  propietarios(){

    this.usarRuta.navigate( ['/propietarios'] );
  }

  agregar_nuevo(){

    this.usarRuta.navigate( ['/agregarNuevo'] )
  }

}
