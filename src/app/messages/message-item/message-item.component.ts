import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
// import { Contact } from './contact.model';
// import { ContactService } from './contact.service';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;
  canEdit: boolean = false;
  

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    //let contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = Contact.name;

    this.contactService.getContact(this.message.sender.id)
    .subscribe(contactData => {
      console.log(contactData);
      this.messageSender = contactData.contact.name;
    })
  }

}
