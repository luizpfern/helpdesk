import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(public servidor:ServidorService) { }

  ngOnInit() {
  }

}
