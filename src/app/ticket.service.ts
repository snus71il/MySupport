import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Ticket} from "./interfaces";
import {environment} from "../environments/environment";

@Injectable()

export class TicketService {
  constructor(private http: HttpClient) {
  }

  create(post: Ticket): Observable<Ticket> {
    return this.http.post(`${environment.fbDbUrl}/tickets.json`, post).
    pipe(map((response) => {
      return {
        ...post,
        id: response.toString()
      }
    }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/tickets/${id}.json`)
  }

  update(post: Ticket): Observable<Ticket> {
    return this.http.patch<Ticket>(`${environment.fbDbUrl}/tickets/${post.id}.json`, post)
  }

  getbyID(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${environment.fbDbUrl}/tickets/${id}.json`).
    pipe(map((post: Ticket) => {
      return {...post, id, date: new Date(post.date)}
    }))
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/tickets.json`).pipe(map((response: {[key: string]: any} ) => {
      return Object.keys(response).map(
        key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }))
    }))
  }

}

