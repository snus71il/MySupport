import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./interfaces";
import {map, Observable} from "rxjs";
import {environment} from "../environments/environment";
import * as moment from 'moment';
import {AlertService} from "./alert.service";

@Injectable()

export class AuthService {

  constructor(
    private http: HttpClient,
    public alert: AlertService) { }

  // определяем валидность времени пользователя
  giveMetoken() {
    const expData = moment(localStorage.getItem('expDate')).toDate();
    if (new Date() > expData) {
      this.logout()
      return null
    }
    // all is good
    return localStorage.getItem('nickname');
  }

  createUser(user: User): Observable<any>{
    return this.http.post<any>(`${environment.fbDbUrl}/users.json`, user)
  }

  logout() {
    this.alert.warning('Logout existing user!')
    localStorage.clear();
  }

  getAllUsers() {
    return this.http.get(`${environment.fbDbUrl}/users.json`).pipe(map((response: {[key: string]: any}) => {
      return Object.keys(response).map(
        key => ({
          ...response[key]
        }))
    }))
  }

}


