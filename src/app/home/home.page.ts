import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServidorService } from '../servidor.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router, public servidor:ServidorService,public platform:Platform) {}
  
  login = {login:'', senha:''}
  register = {login: '', senha: '', confirmaSenha:'', nome:''}
  isLogin = true;

  ionViewWillEnter(){
    this.servidor.isMobile = this.platform.is('mobile');
  }

  async submitLogin(login:string, senha:string) {
    if (await this.servidor.efetueLogin(login,senha) == true) {
      this.router.navigateByUrl('/principal')
      
    } else {
      this.servidor.toastGenerico('Usuário ou senha Inválido');
    }
    this.limpaInputs();
  }

  async submitRegister(login: string, senha: string, confimaSenha: string, nome:string) {
    if (senha !== confimaSenha) {
      this.servidor.toastGenerico('As senhas de diferem!')
    } else {
      await this.servidor.efetueRegistroUsuario(login,senha,nome);
      this.limpaInputs();
      this.servidor.toastGenerico('Conta Registrada!')
    }
  }

  alteraLogin(){
    this.limpaInputs();
    this.isLogin = this.isLogin ? false : true;
  }

  limpaInputs() {
    this.login = {login:'', senha:''};
    this.register = {login: '', senha: '', confirmaSenha:'', nome:''};
  }

}