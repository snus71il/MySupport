import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../interfaces";
import {Router} from "@angular/router";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  users: User[] = []

  constructor(public auth: AuthService,
              public router: Router,
              public alert: AlertService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.auth.getAllUsers().subscribe(
      res => {
        this.users = res.filter((user: User) => user.email === this.form.value.email.trim()
        && user.password === this.form.value.password.trim())
        if (this.users.length === 0) {
          this.alert.warning('This user not found!')
        } else {
            const expDate = new Date(new Date().getTime() + 2*1000*1000);
            localStorage.setItem('nickname', this.users[0].nickname)
            if (this.users[0].techsupport) {localStorage.setItem('techsupport', '1')} else {localStorage.setItem('techsupport', '0')}
            localStorage.setItem('expDate',  expDate.toString())
            this.router.navigate(['/'])
            this.alert.succes('User was login')
            this.router.routeReuseStrategy.shouldReuseRoute = () => false
            this.router.onSameUrlNavigation = 'reload'
          }
        }
    )
  }
}
