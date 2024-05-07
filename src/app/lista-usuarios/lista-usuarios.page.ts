import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServidorService } from '../servidor.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {

  public usuarios:any = [];
  public usuariosOrigem: any = [];
  public busca: string = ''

  constructor(public servidor: ServidorService, private router: Router) { }

  async ionViewWillEnter(){
    this.usuariosOrigem = await this.servidor.getUsuarios();
    this.usuarios = this.usuariosOrigem
  }

  ngOnInit() {}

  openItem(id:number) {
    this.router.navigateByUrl('/usuarios/'+id);
  }

  async delete(usuario:any) {
    if ((await this.servidor.confirmaGenerico(`Deseja excluir ${usuario.nome}`)) == 'confirm') {
      await this.servidor.deletaUsuario(usuario.id);
      this.usuarios = await this.servidor.getUsuarios();
    }
  }

  navigateBack() {
    this.router.navigateByUrl('/principal')
  }
}
