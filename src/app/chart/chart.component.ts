import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../alert.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Chart, registerables} from "chart.js";
import {TicketService} from "../ticket.service";
import {Ticket} from "../interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit, OnDestroy {

  myChart: Chart
  posts: Ticket[] = []
  pSub: Subscription

  constructor(
    private alert: AlertService,
    private auth: AuthService,
    private router: Router,
    private ts: TicketService
  ) {Chart.register(...registerables)}

  ngOnDestroy() {
    if (this.pSub) {this.pSub.unsubscribe()}
  }

  ngOnInit(): void {

    if (this.auth.giveMetoken() === null) {
      this.router.navigate(['/'])
      this.alert.warning('Need user login!')
      return
    } else {

      const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      const data1 = [0,0,0,0,0,0,0,0,0,0,0,0]
      const data2 = [0,0,0,0,0,0,0,0,0,0,0,0]

      this.pSub = this.ts.getAll().subscribe(posts => {
        // получили все посты
        this.posts = posts
        // распределяем по месяцам
        for (let post of this.posts) {
          const nmrMes = post.date.getMonth()
          const nmrMesR = new Date(post.dateResolve).getMonth()
          if (nmrMes != null) {
            data1[nmrMes] = data1[nmrMes] + 1
          }
          if (nmrMesR != null) {
            data2[nmrMesR] = data2[nmrMesR] + 1
          }
        }
        // строим чарт
        this.myChart = new Chart('canvas',
        {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              { label: 'amount of tickets',
                data: data1,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
              },
              { label: 'amount of closed tickets',
                data: data2,
                backgroundColor: 'rgb(50, 205, 50)',
                borderColor: 'rgb(50, 205, 50)',
                borderWidth: 1
              }
            ]
          },
          options: {}
        })});
    }
  }

  cancel() {
    this.router.navigate(['/'])
  }
}
