import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  
  constructor(private contactService: ContactService) { }

  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;
  
  ngOnInit() {
    //this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
    //was this.contacts =
    this.contactService.getContacts();
    
  }

  // onSelected(contact: Contact){
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }

}
