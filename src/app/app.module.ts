import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ServiceWorkerModule } from '@angular/service-worker';
import {environment} from '../environments/environment';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthService} from "./auth.service";
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MainpageComponent} from './mainpage/mainpage.component';
import {HomeComponent} from './home/home.component';
import {CreateComponent} from './create/create.component';
import {EditComponent} from './edit/edit.component';
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {AlertComponent} from './alert/alert.component';
import {AlertService} from "./alert.service";
import {TicketService} from "./ticket.service";
import {SearchPipe} from "./search.pipe";
import {UserPipe} from "./user.pipe";
import {ChartComponent} from './chart/chart.component';
import {SendMailService} from "./sendmail.service";
import {MailcomComponent} from './mailcom/mailcom.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        MainpageComponent,
        HomeComponent,
        CreateComponent,
        EditComponent,
        AlertComponent,
        SearchPipe,
        SearchPipe,
        UserPipe,
        ChartComponent,
        MailcomComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        QuillModule
    ],
  providers: [AuthService, AlertService, TicketService, SendMailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
