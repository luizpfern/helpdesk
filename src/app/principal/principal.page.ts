import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServidorService } from '../servidor.service';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  @ViewChild('MeuGrafico', { static: false }) elemento!: ElementRef;
  @ViewChild('MeuGrafico2', { static: false }) elemento2!: ElementRef;
  @ViewChild('MeuGrafico3', { static: false }) elemento3!: ElementRef;


  constructor(public servidor:ServidorService, private router:Router) { }

  async ngOnInit() {

    setTimeout(() => {
      let a = this.elemento.nativeElement
      let b = this.elemento2.nativeElement
      let c = this.elemento3.nativeElement
      new Chart(a, {
        type: 'line',
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
          datasets: [
              {
                label: 'Valor Total em R$',
                data: [20532, 19532, 24656, 25673, 23565, 27974]
              }
        ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Valor total de Patrimonios durante os meses'
            }
          }
        }
      });
  
      new Chart(b, {
        type: 'bar',
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
          datasets: [
              {
                label: 'Chamados concluídos',
                data: [233, 112, 226, 342, 165, 321],
              }
        ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chamadas Concluídas durante o ano'
            }
          }
        }
      });
  
      new Chart(c, {
        type: 'doughnut',
        data: {
          labels: ['Produtos','Serviços'],
          datasets: [{
            data: [205,39],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Distribuição de Patrimônios'
            }
          }
        }
      });

    });

    
  
  }

  open(path:string) {
    this.router.navigateByUrl(path)
  }

}
