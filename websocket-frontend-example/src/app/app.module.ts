import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WebSocketService } from "./services/websocket.service";
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './services/notification.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [WebSocketService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
