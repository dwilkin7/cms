import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  constructor(private contactService: ContactService) { }


  contacts: Contact[] = [];
  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
