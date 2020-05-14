import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationModel } from '../models/notification';

@Injectable()
export class NotificationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>('http://localhost:8080/websocket-backend/notify');
  }

  add() {
    return this.http.post('http://localhost:8080/websocket-backend/notify/add', {responseType: 'text'});
  }

  delete(id: number) {
    return this.http.post(`http://localhost:8080/websocket-backend/notify/delete?id=${id}`, {responseType: 'text'});
  }
}
