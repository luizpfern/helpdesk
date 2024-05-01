import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {

  usuarios:any [] = [];

  constructor(public router:Router) { }

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigateByUrl('/principal')
  }
}
