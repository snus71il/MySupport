import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export type ALertType  = 'succes' | 'warning'

export interface Alert {
  type: string
  text: string
}

@Injectable()

export class AlertService {
  public alert$ = new Subject<Alert>()

  succes(text: string) {
    this.alert$.next({type: 'succes', text})
  }

  warning(text: string) {
    this.alert$.next({type: 'warning', text})
  }
}
