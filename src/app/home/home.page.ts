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


  async submitLogin(user:string, pass:string) {
    console.log(user)
    console.log(pass)
    if (await this.servidor.efetueLogin(user,pass) == true) {
      console.log('login ok')
    } else {
      console.log('falha')
    }

    console.log('this.servidor.usuario:', this.servidor.usuario)
  }

}
