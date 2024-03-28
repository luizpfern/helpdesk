import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}
  
  login = {user:'', pass:''}


  submitLogin(user:string, pass:string) {
    console.log(user)
    console.log(pass)

    // Comando sql que busca usuario
  }

}
