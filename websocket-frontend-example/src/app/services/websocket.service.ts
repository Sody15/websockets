import {Injectable} from "@angular/core";

const SockJs = require("sockjs-client");
const Stomp = require("stompjs");


@Injectable()
export class WebSocketService {
  constructor() { }

  connect() {
    const socket = new SockJs(`http://localhost:8080/websocket-backend/socket`);
    const stompClient = Stomp.over(socket);
    return stompClient;
  }
}
