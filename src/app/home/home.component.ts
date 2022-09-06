import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../alert.service";
import {Ticket} from "../interfaces";
import {TicketService} from "../ticket.service";
import {Subscription} from "rxjs";
import {SendMailService} from "../sendmail.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  noregister: boolean
  posts: Ticket[] = []
  pSub: Subscription
  dSub: Subscription
  searchT = ""
  usernick: string = ""

  constructor(public auth: AuthService,
              public router: Router,
              public alert: AlertService,
              public ts: TicketService,
              public sml: SendMailService
  ) { }

  ngOnInit(): void {
    if (this.auth.giveMetoken() === null) {this.noregister = true} else {this.noregister = false}
    // фильтр по пользователю, если он не техподдержка
    if (localStorage.getItem('techsupport') === '1') {this.usernick = ""} else {this.usernick = localStorage.getItem('nickname')}
    // получаем посты из базы
    this.pSub = this.ts.getAll().subscribe(posts => {this.posts = posts})
    }

  ngOnDestroy() {
    if (this.pSub) {this.pSub.unsubscribe()}
    if (this.dSub) {this.dSub.unsubscribe()}
  }

  logout() {
    if (confirm('Are you sure logout?')) {
    this.auth.logout()
    this.noregister = true
    this.router.navigate(['/'])
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    }
  }

  delpost(id: string) {
    if (this.auth.giveMetoken() === null) {
      this.alert.warning('Need user login!')} else {
        if (confirm('Are you sure delete this ticket?')) {
        this.dSub = this.ts.remove(id).subscribe(
        () => {
          this.posts = this.posts.filter(post => post.id !== id)
          this.alert.warning('ticket was delete!')
        })
    }}
  }

  sendmail($event) {
    this.sml.sendEmail($event)
    console.log($event)
  }
}
