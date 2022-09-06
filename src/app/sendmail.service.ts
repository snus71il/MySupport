import {Injectable} from "@angular/core";
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';

@Injectable()

export class SendMailService {
  sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_51oz7g5', 'template_1lgo8c7', e.target as HTMLFormElement, 'G-mRRVD7e0I8pliWd')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      })
  }
}
