import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServidorService } from '../servidor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router, public servidor:ServidorService) {}
  
  login = {user:'', pass:''}
  register = {user: '', pass: '', passConfirm:''}
  isLogin = true;


  async submitLogin(user:string, pass:string) {
    console.log(user)
    console.log(pass)
    if (await this.servidor.efetueLogin(user,pass) == true) {
      
      if (this.servidor.usuario.tipo_acesso == 0) {
        this.router.navigateByUrl('/principal')
      }
      
    } else {
      this.servidor.toastGenerico('Usuário ou senha Inválido');
    }
  }

  async submitRegister(user: string, pass: string, passConfirm: string) {
    if (pass !== passConfirm) {
      this.servidor.toastGenerico('As senhas de diferem!')
    } else {
      await this.servidor.efetueRegistroUsuario(user,pass);
      this.register.pass='',this.register.passConfirm='',this.register.user;
      this.servidor.toastGenerico('Conta Registrada!')
    }
  }

  alteraLogin(){
    this.isLogin = this.isLogin ? false : true;

    console.log(this.isLogin)
  }

}
