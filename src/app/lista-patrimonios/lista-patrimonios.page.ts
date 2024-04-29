import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-patrimonios',
  templateUrl: './lista-patrimonios.page.html',
  styleUrls: ['./lista-patrimonios.page.scss'],
})
export class ListaPatrimoniosPage implements OnInit {

  public patrimonios:any = [];
  public patrimoniosFiltro: any = [];
  public busca: string = ''

  constructor(public servidor: ServidorService, private router: Router) { }

  async ionViewWillEnter(){
    this.patrimonios = await this.servidor.getPatrimonios();
  }

  async ngOnInit() {

  }

  openItem(id:number) {
    this.router.navigateByUrl('/patrimonios/'+id);
  }

  navigateBack() {
    this.router.navigateByUrl('/principal')
  }

  async filtro() {

  }

  async delete(patrimonio:any) {
    if ((await this.servidor.confirmaGenerico(`Deseja excluir ${patrimonio.descricao}`)) == 'confirm') {
      await this.servidor.deletaPatrimonio(patrimonio.id);
      this.patrimonios = await this.servidor.getPatrimonios();
    }


  }
}
