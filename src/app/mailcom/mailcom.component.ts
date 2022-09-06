import { Component, OnInit } from '@angular/core';
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';
import {Router} from "@angular/router";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-mailcom',
  templateUrl: './mailcom.component.html',
  styleUrls: ['./mailcom.component.css']
})
export class MailcomComponent implements OnInit {

  constructor(
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  sendEmail(e: SubmitEvent) {
    e.preventDefault();
    emailjs.sendForm('service_51oz7g5', 'template_1lgo8c7', e.target as HTMLFormElement, 'G-mRRVD7e0I8pliWd')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      })
    this.router.navigate(['/'])
    this.alert.succes('message was send')
  }

  cancel() {
    this.router.navigate(['/'])
  }
}
