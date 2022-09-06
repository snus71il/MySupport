import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../alert.service";
import {TicketService} from "../ticket.service";
import {Subscription, switchMap} from "rxjs";
import {Ticket} from "../interfaces";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  form: FormGroup
  uSub: Subscription
  post: Ticket
  techsupport: boolean = false
  flagresolve: boolean = false
  dateResolve = new Date()
  authorResolve: string = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    private ts: TicketService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.auth.giveMetoken() === null) {
      this.router.navigate(['/'])
      this.alert.warning('Need user login!')
      return
    } else {
      // это техподдержка
      if (localStorage.getItem('techsupport') === '1') {this.techsupport = true}
      // получим их базы тикет
      this.route.params.pipe(
        switchMap((params: Params) => {return this.ts.getbyID(params['id'])})
        ).subscribe((post: Ticket) => {
        // получили тикет из базы
        this.post = post
        // отфлажили состояние резолва до редактирования
        this.flagresolve = post.resolve
        // заполнили форму
        this.form = new FormGroup({
        text1: new FormControl(post.text1),
        text2: new FormControl(post.text2),
        resolve: new FormControl(post.resolve)
        })
      })
    }
  }

  ngOnDestroy() {
    if (this.uSub) {this.uSub.unsubscribe()}
  }

  cancel() {
    this.router.navigate(['/'])
  }

  submit() {
    if (this.form.invalid) {}
    else {
      if (this.flagresolve != this.form.value.resolve)
      // состояние резолва поменялось, если оно было тру, то значит стало фалсе и дату нужно убрать
      {if (this.flagresolve) {
        this.dateResolve = null
        this.authorResolve = ''
      } else {
        this.dateResolve = new Date()
        this.authorResolve = localStorage.getItem("nickname")
      }}
      // записали в базу
      this.uSub = this.ts.update({
        ... this.post,
        text1: this.form.value.text1,
        text2: this.form.value.text2,
        resolve: this.form.value.resolve,
        dateResolve: this.dateResolve,
        authorSupport: this.authorResolve
      }).subscribe(() => {
        this.router.navigate(['/'])
        this.alert.succes('ticket was edit')
      })
    }
  }
}
