import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-chamados',
  templateUrl: './lista-chamados.page.html',
  styleUrls: ['./lista-chamados.page.scss'],
})
export class ListaChamadosPage implements OnInit {

  constructor(public servidor: ServidorService, private router: Router) { }

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigateByUrl('/principal')
  }

  goTo(route:string) {
    this.router.navigateByUrl(route)
  }
}
