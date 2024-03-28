import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}
  
  login = {user:'', pass:''}


  submitLogin(user:string, pass:string) {
    console.log(user)
    console.log(pass)
  }

}
