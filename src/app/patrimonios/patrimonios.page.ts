import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patrimonios',
  templateUrl: './patrimonios.page.html',
  styleUrls: ['./patrimonios.page.scss'],
})
export class PatrimoniosPage implements OnInit {

  id:any = 0;
  patrimonio:any = {descricao:'',quantidade:''}

  constructor(public servidor:ServidorService,private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id>0) this.patrimonio = await this.servidor.getPatrimonios(this.id)
    console.log('this.patrimonio:', this.patrimonio)
  }

}
