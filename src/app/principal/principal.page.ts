import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(public servidor:ServidorService, private router:Router) { }

  ngOnInit() {
  }

  open(path:string) {
    this.router.navigateByUrl(path)
  }

}
