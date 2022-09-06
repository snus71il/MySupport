import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../alert.service";
import {Ticket} from "../interfaces";
import {TicketService} from "../ticket.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup

  constructor(
    private router: Router,
    private alert: AlertService,
    private ts: TicketService,
    private auth: AuthService) {

  }

  ngOnInit(): void {
    if (this.auth.giveMetoken() === null) {
      this.router.navigate(['/'])
      this.alert.warning('Need user login!')
      return
    } else {
      this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      text1: new FormControl(null, [Validators.required])
  })}
  }

  cancel() {
    this.router.navigate(['/'])
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const ticket: Ticket = {
      title: this.form.value.title,
      text1: this.form.value.text1,
      author: localStorage.getItem('nickname'),
      date: new Date()
    };

    this.ts.create(ticket).subscribe(
      () => {
        this.router.navigate(['/'])
        this.alert.succes('ticket was create')
      }
    )
  }
}
