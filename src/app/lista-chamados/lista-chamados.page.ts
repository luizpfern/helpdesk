import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-chamados',
  templateUrl: './lista-chamados.page.html',
  styleUrls: ['./lista-chamados.page.scss'],
})
export class ListaChamadosPage implements OnInit {

  chamados:any = []
  chamadosOrigem:any = []
  toggle: boolean = false
  busca: String = ''
  concluidoEmpresa: any;
  concluidoFunc: any;

  constructor(public servidor: ServidorService, private router: Router) { }

  ngOnInit() {}

  async ionViewWillEnter(){

    this.concluidoEmpresa = await this.servidor.getQtdChamados(false);
    this.concluidoFunc = await this.servidor.getQtdChamados(true);
    
    this.chamadosOrigem = await this.servidor.getChamados();
    this.chamados = this.chamadosOrigem;

    if (this.servidor.usuario.tipo_acesso == 0) {
      this.chamados = this.chamadosOrigem.filter((e: { status: number; }) => e.status != 0)
    }

    console.log('this.chamados:', this.chamados)
  }

  alternarEmAberto() {
    this.chamados = this.toggle ? this.chamadosOrigem.filter((e: { status: number; }) => e.status != 0) : this.chamadosOrigem.filter((e: { status: number; }) => e.status == 0)
  }

  navigateTo(route:string) {
    this.router.navigateByUrl(route)
  }
}
