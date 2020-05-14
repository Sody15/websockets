package com.stackextend.websocketbackendexample.controller;

import com.stackextend.websocketbackendexample.model.Notification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate template;

    List<Notification> notificationsList = new ArrayList<Notification>();
    
    int count = 0;
    
    public NotificationController() {
    	this.notificationsList.add(new Notification(count++));
    	this.notificationsList.add(new Notification(count++));
	}

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/notify")
    public List<Notification> getNotifications() {
    	return notificationsList;
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/notify/add")
    public String add() {
    	this.notificationsList.add(new Notification(count++));
        template.convertAndSend("/topic/notification", notificationsList);
        return "Notification added event sent to Angular !";
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/notify/delete")
    @ResponseBody
    public String delete(@RequestParam() int id) {
    	this.notificationsList = 
    		this.notificationsList
    			.stream()
    			.filter(n -> n.getId() != id)
    			.collect(Collectors.toList());
        template.convertAndSend("/topic/notification", notificationsList);    	
        return "Notification deleted event sent to Angular !";
    }
}
