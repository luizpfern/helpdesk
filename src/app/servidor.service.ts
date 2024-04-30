import { Injectable } from '@angular/core';
import { Pool, createPool } from '@vercel/postgres';
import { ToastController, LoadingController } from '@ionic/angular';
import { alertController } from '@ionic/core';

const pool = createPool({
  connectionString: 'postgres://default:FBpO6LCj0MRx@ep-morning-voice-a4n5t2o0-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
});

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  usuario:any;
  isMobile:any;

  constructor(public toast: ToastController, public loading: LoadingController) { }

  async efetueLogin(user:string,pass:string) {
    const loading = await this.loadingGenerico('Efetuando Login');
    const response = await pool.sql`SELECT * FROM USUARIOS WHERE LOGIN=${user} and SENHA=${pass}`;
    loading.dismiss();
    
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

  async getPatrimonios(id?:number) {
    const loading = await this.loadingGenerico('Carregando Patrimônios');
    let result = id ? (await pool.sql`SELECT * FROM PATRIMONIOS WHERE id=${id}`).rows[0] : (await pool.sql`SELECT * FROM PATRIMONIOS`).rows;
    loading.dismiss();
    return result
  }

  async registraPatrimonio(data:{descricao:string,quantidade:number},id?:number) {
    if (id != 0) {
      await pool.sql`UPDATE PATRIMONIOS SET descricao=${data.descricao}, quantidade=${data.quantidade} WHERE id=${id}`;
    } else {
      await pool.sql`INSERT INTO PATRIMONIOS (quantidade,descricao) values (${data.quantidade},${data.descricao})`;
    }
  }

  async deletaPatrimonio(id:number) {
    await pool.sql`DELETE FROM PATRIMONIOS WHERE id=${id}`;
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

  async confirmaGenerico(texto:string) {
    const alert = await alertController.create({
      header:texto,
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sim',
          role: 'confirm',
        },
      ]
    })

    alert.present()

    return (await alert.onDidDismiss()).role
  }

}