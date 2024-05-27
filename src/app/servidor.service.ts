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
  
  async efetueRegistroUsuario(login:string, senha:string, nome:string): Promise<number> {
    const loading = await this.loadingGenerico('Efetuando Registro');
    let valido
    if ((await pool.sql`SELECT count(*) as q FROM USUARIOS WHERE login=${login}`).rows[0]['q'] > 0) {
      valido = -1
    } else {
      await pool.sql`INSERT INTO USUARIOS (login,senha,tipo_acesso,nome) values (${login},${senha},0,${nome})`
      valido = 1
    }
    loading.dismiss();
    return valido
  }

  async getPatrimonios(id?:number) {
    const loading = await this.loadingGenerico('Carregando Patrimônios');
    let result = id ? (await pool.sql`SELECT * FROM PATRIMONIOS WHERE id=${id}`).rows[0] : (await pool.sql`SELECT * FROM PATRIMONIOS order by id`).rows;
    loading.dismiss();
    return result
  }

  async registraPatrimonio(data:{descricao:string,quantidade:number, valor:number, tipo_patrimonio:number},id?:number) {
    const loading = await this.loadingGenerico('Registrando Patriônio');
    if (id != 0) {
      await pool.sql`UPDATE PATRIMONIOS SET descricao=${data.descricao}, quantidade=${data.quantidade}, valor=${data.valor}, tipo_patrimonio=${data.tipo_patrimonio} WHERE id=${id}`;
    } else {
      await pool.sql`INSERT INTO PATRIMONIOS (quantidade,descricao,valor,tipo_patrimonio,id_funcionario) values (${data.quantidade},${data.descricao},${data.valor},${data.tipo_patrimonio},${this.usuario.id})`;
    }
    loading.dismiss();
  }

  async deletaPatrimonio(id:number) {
    await pool.sql`DELETE FROM PATRIMONIOS WHERE id=${id}`;
  }

  async getUsuarios(id?:number) {
    const loading = await this.loadingGenerico('Carregando Usuários');
    let result = id ? (await pool.sql`SELECT * FROM USUARIOS WHERE id=${id}`).rows[0] : (await pool.sql`SELECT *,(CASE WHEN tipo_acesso = 0 THEN 'Cliente' WHEN tipo_acesso = 1 THEN 'Funcionário' WHEN tipo_acesso = 2 THEN 'Gerente' ELSE 'Desconhecido' END) as tipo_descricao FROM USUARIOS`).rows;
    loading.dismiss();
    return result
  }

  async registraUsuario(data:{login:string, senha:string, nome:string, tipo_acesso:number},id?:number) {
    const loading = await this.loadingGenerico('Registrando Usuário');
    if (id != 0) {
      await pool.sql`UPDATE USUARIOS SET nome=${data.nome}, login=${data.login}, senha=${data.senha}, tipo_acesso=${data.tipo_acesso} WHERE id=${id}`;
    } else {
      await pool.sql`INSERT INTO USUARIOS (nome,login,senha,tipo_acesso) values (${data.nome},${data.login},${data.senha},${data.tipo_acesso})`;
    }
    loading.dismiss();
  }

  async deletaUsuario(id:number) {
    await pool.sql`DELETE FROM USUARIOS WHERE id=${id}`;
  }

  async getChamados(id?:number) {
    const loading = await this.loadingGenerico('Carregando Chamados');
    let result
    if (this.usuario.tipo_acesso == 0) {
      result = id ? (await pool.sql`SELECT * FROM CHAMADOS WHERE id=${id} and id_usuario=${this.usuario.id}`).rows[0] : (await pool.sql`SELECT * FROM CHAMADOS where id_usuario=${this.usuario.id}`).rows;
    } else {
      result = id ? (await pool.sql`SELECT * FROM CHAMADOS WHERE id=${id}`).rows[0] : (await pool.sql`SELECT a.*,b.nome as nome_usuario FROM CHAMADOS a left outer join USUARIOS b on b.id=a.id_usuario WHERE status = 0`).rows;
    }
    loading.dismiss();
    return result
  }

  async enviaChamado(data:{id_patrimonio:number, titulo:string, observacao:string}) {
    const loading = await this.loadingGenerico('Enviando Chamado');
    await pool.sql`INSERT INTO CHAMADOS (status,id_usuario,id_patrimonio,titulo,observacao) values (0,${this.usuario.id},${data.id_patrimonio},${data.titulo},${data.observacao})`;
    loading.dismiss();
  }

  async concluiChamado(resolucao:string, id:string) {
    const loading = await this.loadingGenerico('Concluindo Chamado');
    await pool.sql`UPDATE CHAMADOS SET status=1, resolucao=${resolucao}, id_funcionario=${this.usuario.id} WHERE id=${id}`
    loading.dismiss();
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

  async getQtdChamados(funcOnly:boolean) {
    const loading = this.loadingGenerico('Carregando Dados');
    const response = !funcOnly ? (await pool.sql`SELECT count(*) as q from CHAMADOS where status=1 and data_criacao=now()::date`).rows[0]['q'] : (await pool.sql`SELECT count(*) as q from CHAMADOS where status=1 and data_criacao=now()::date and id_funcionario=${this.usuario.id}`).rows[0]['q'];
    (await loading).dismiss();
    return response
  }

  async getGraficoPatrimonios() {
    return (await pool.sql`SELECT * FROM PATRIMONIOS ORDER BY VALOR desc limit 5`).rows
  }

}
