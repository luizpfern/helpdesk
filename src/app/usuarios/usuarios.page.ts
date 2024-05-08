import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  id:any = 0;
  usuario:any = {login:'', senha:'', tipo_acesso:'', nome:''}

  constructor(public servidor:ServidorService,private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id>0) this.usuario = await this.servidor.getUsuarios(this.id)
    console.log(this.usuario)
  }

  async onSubmit(usuario:{login:string, senha:string, nome:string, tipo_acesso:number}) {
    await this.servidor.registraUsuario(usuario,this.id);
    this.router.navigateByUrl('/lista-usuarios');
  }

  close() {
    this.router.navigateByUrl('/lista-usuarios');
  }

}
