import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  messages: Message[] = [];
  subscription: Subscription;

  ngOnInit() {
    this.messageService.messageChangeEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    }
    );
    this.messageService.getMessages();
  }

onAddMessage(message: Message){
  this.messages.push(message);
}

// ngOnDestroy() {
//   this.subscription.unsubscribe();
// }
}