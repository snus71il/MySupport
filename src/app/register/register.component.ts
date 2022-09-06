import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../interfaces";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../alert.service";
import {filter, pipe} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup
  users: User[] = []
  userse: User[] = []

  constructor(
    public auth: AuthService,
    public router: Router,
    public alert: AlertService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nickname: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      techsupport: new FormControl(null)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const user: User = {
      nickname: this.form.value.nickname,
      email: this.form.value.email,
      password: this.form.value.password,
      techsupport: this.form.value.techsupport
    }

    this.auth.getAllUsers().subscribe(
      res => {
        this.users = res.filter((user: User) => user.nickname === this.form.value.nickname.trim())
        if (this.users.length > 0) {
          this.alert.warning('This nickname is exist! Need another')
        } else {
          this.userse = res.filter((user: User) => user.email === this.form.value.email.trim())
          if (this.userse.length > 0) {
            this.alert.warning('This email is exist! Need another')
          } else {
            this.auth.createUser(user).subscribe(() => {
              this.router.navigate(['/'])
              this.alert.succes('User was create')
            })
          }
        }
      }
    )
  }

}
