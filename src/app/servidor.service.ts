import { Injectable } from '@angular/core';
import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: 'postgres://default:FBpO6LCj0MRx@ep-morning-voice-a4n5t2o0-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
});

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  usuario:any;

  constructor() { }

  async efetueLogin(user:string,pass:string) {
    const response = await pool.sql`SELECT * FROM USUARIOS WHERE LOGIN=${user} and SENHA=${pass}`;
    console.log(response.rows);
    if (response.rows.length == 0) {
        return false;
    } else {
        this.usuario = response.rows[0];
        return true;
    }
}
}
