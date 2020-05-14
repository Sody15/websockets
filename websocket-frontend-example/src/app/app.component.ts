import { Observable } from 'rxjs';
import { NotificationService } from './services/notification.service';
import {Component, OnInit} from '@angular/core';
import { WebSocketService } from "./services/websocket.service";
import { NotificationModel } from './models/notification';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public notifications = 0;
    notifs$: Observable<NotificationModel[]>;
    private stompClient: any;

    constructor(private webSocketService: WebSocketService,
                private notificationService: NotificationService) {
      this.stompClient = this.webSocketService.connect();

      this.stompClient.connect({}, frame => {
        this.stompClient.subscribe('/topic/notification', notifications => {
          // this.notifications = JSON.parse(notifications.body).count;
          this.getNotifications();
        });
      });
    }

    ngOnInit() {
      this.getNotifications();
    }

    getNotifications() {
      this.notifs$ = this.notificationService.getAll();
    }

    addNotification() {
      this.notificationService.add().subscribe();
    }

    deleteNotification(id: number) {
      this.notificationService.delete(id).subscribe();
    }
}
