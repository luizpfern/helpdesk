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
  public patrimoniosOrigem: any = [];
  public busca: string = ''

  constructor(public servidor: ServidorService, private router: Router) { }

  async ionViewWillEnter(){
    this.patrimoniosOrigem = await this.servidor.getPatrimonios();
    console.log('this.patrimoniosOrigem:', this.patrimoniosOrigem)
    this.patrimonios = this.patrimoniosOrigem
  }

  async ngOnInit() {}

  openItem(id:number) {
    this.router.navigateByUrl('/patrimonios/'+id);
  }

  navigateBack() {
    this.router.navigateByUrl('/principal')
  }

  async filtro() {
    let searchtext = this.busca;
    if (this.busca == '') {
      this.patrimonios = this.patrimoniosOrigem;
    } else {
      this.patrimonios = this.patrimoniosOrigem.filter(function(o:any) {
        return Object.keys(o).some(function(k) {
          return o[k].toString().toLowerCase().indexOf(searchtext.toLowerCase()) != -1;
        })
      })
    }
  }

  async delete(patrimonio:any) {
    if ((await this.servidor.confirmaGenerico(`Deseja excluir ${patrimonio.descricao}`)) == 'confirm') {
      await this.servidor.deletaPatrimonio(patrimonio.id);
      this.patrimonios = await this.servidor.getPatrimonios();
    }
  }
}
