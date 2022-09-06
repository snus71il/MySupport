import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})

export class MainpageComponent implements OnInit {

  locuser: string

  constructor(
    private auth: AuthService
   ) { }

  ngOnInit() {
    this.locuser ='My user: '+localStorage.getItem('nickname')
  }

}
