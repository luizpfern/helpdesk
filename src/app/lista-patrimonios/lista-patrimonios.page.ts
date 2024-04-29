import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-patrimonios',
  templateUrl: './lista-patrimonios.page.html',
  styleUrls: ['./lista-patrimonios.page.scss'],
})
export class ListaPatrimoniosPage implements OnInit {

  public patrimonios:any = [];

  constructor(public servidor: ServidorService, private router: Router) { }

  async ionViewWillEnter(){
    this.patrimonios = await this.servidor.getPatrimonios();
  }

  async ngOnInit() {

  }

  openItem(id:number) {
    this.router.navigateByUrl('/patrimonios/'+id);
  }

  navigateBack() {
    this.router.navigateByUrl('/principal')
  }

  async filtro() {
    let data = [{ "id": 1, "first_name": "Jean", "last_name": "Owens", "email": "jowens0@google.ru", "gender": "Female" }, { "id": 2, "first_name": "Marie", "last_name": "Morris", "email": "mmorris1@engadget.com", "gender": "Female" }, { "id": 3, "first_name": "Larry", "last_name": "Wallace", "email": "lwallace2@example.com", "gender": "Male" }],
    keys = Object.keys(data[0]),
    searchText = "s",
    result = data.filter(o => 
        keys.some(k => o['email'].toString().toLowerCase().indexOf(searchText) !== -1));
  }

  async delete(id:number) {
    const a = await this.servidor.confirmaGenerico('Deseja exluir Patriônio?');
    console.log('a:', a)

    console.log(id)
  }
}
