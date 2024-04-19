import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: '',
});


// A one-shot query

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}
  
  login = {user:'', pass:''}


  async submitLogin(user:string, pass:string) {
    console.log(user)
    console.log(pass)
    const query = `SELECT * FROM USUARIOS WHERE login='${user}' and senha='${pass}'`
    const response = await pool.sql`SELECT * FROM USUARIOS`
    console.log(response.rows)
    if (response.rows.length == 0) {
      console.log('Usuario ou senha invalido')
    } else {
      console.log('Login valido, ir para outra tela')
    }
  }

}
