import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.page.html',
  styleUrls: ['./chamados.page.scss'],
})
export class ChamadosPage implements OnInit {

  chamado:any = {titulo:'', observacao:'', id_patrimonio:'',resolucao:'',status:''};
  listaPatrimonios:any = [];
  id:any = 0

  constructor(public servidor: ServidorService, private router: Router,private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id>0) this.chamado = await this.servidor.getChamados(this.id)
    this.listaPatrimonios = await this.servidor.getPatrimonios();
  }

  async enviarChamado(chamado:{id_patrimonio:number, titulo:string, observacao:string, }) {
    await this.servidor.enviaChamado(chamado)
    this.navigateBack();
  }

  async concluirChamado(resolucao:string) {
    await this.servidor.concluiChamado(resolucao,this.id);
    this.navigateBack()
  }

  navigateBack() {
    this.router.navigateByUrl('/lista-chamados')
  }

}
