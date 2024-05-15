import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.page.html',
  styleUrls: ['./chamados.page.scss'],
})
export class ChamadosPage implements OnInit {

  constructor(public servidor: ServidorService, private router: Router) { }

  ngOnInit() {
  }

  navigateBack() {
    this.router.navigateByUrl('/lista-chamados')
  }

}
