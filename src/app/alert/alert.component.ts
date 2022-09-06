import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 3000
  public text: string
  public type = 'succes'
  alSub: Subscription

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alSub = this.alertService.alert$.subscribe(
      alert => {
        this.text = alert.text
        this.type = alert.type
        // очищаем через заданный промежуток времени, clearTimeout - для очистки памяти
        const timeout = setTimeout(() => {clearTimeout(timeout); this.text=''}, this.delay);
      }
    )
  }

  ngOnDestroy() {
    if (this.alSub) {
      this.alSub.unsubscribe()}
  }
}
