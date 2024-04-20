import { Injectable } from '@angular/core';
import { createPool } from '@vercel/postgres';
import { ToastController, LoadingController } from '@ionic/angular';

const pool = createPool({
  connectionString: 'postgres://default:FBpO6LCj0MRx@ep-morning-voice-a4n5t2o0-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
});

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  usuario:any;

  constructor(public toast: ToastController, public loading: LoadingController) { }

  async efetueLogin(user:string,pass:string) {
    const loading = await this.loadingGenerico('Efetuando Login');
    const response = await pool.sql`SELECT * FROM USUARIOS WHERE LOGIN=${user} and SENHA=${pass}`;
    loading.dismiss();
    
    console.log(response.rows);
    if (response.rows.length == 0) {
        return false;
    } else {
        this.usuario = response.rows[0];
        return true;
    }
  }
  
  async efetueRegistroUsuario(user:string, pass:string) {
    await pool.sql`INSERT INTO USUARIOS (login,senha,tipo_acesso) values (${user},${pass},0)`
  }

  async toastGenerico(texto:string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 3000,
      position: 'top',
    });

    await toast.present();
  }

  async loadingGenerico(texto:string) {
    const loading = await this.loading.create({
      message: texto,
      duration: 60000,
      spinner:'dots',
      mode:'ios'
    });

    loading.present();
    return loading
  }

}
