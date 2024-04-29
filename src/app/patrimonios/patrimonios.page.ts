import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patrimonios',
  templateUrl: './patrimonios.page.html',
  styleUrls: ['./patrimonios.page.scss'],
})
export class PatrimoniosPage implements OnInit {

  id:any = 0;
  patrimonio:any = {descricao:'',quantidade:''}

  constructor(public servidor:ServidorService,private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id>0) this.patrimonio = await this.servidor.getPatrimonios(this.id)
  }

  async onSubmit(patrimonio:{quantidade:number, descricao:string}) {
    await this.servidor.registraPatrimonio(patrimonio,this.id);
    this.router.navigateByUrl('/lista-patrimonios');
  }

  close() {
    this.router.navigateByUrl('/lista-patrimonios');
  }

}
