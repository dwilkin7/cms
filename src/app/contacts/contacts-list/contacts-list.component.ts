import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  constructor() { }

  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact('1', 'Bro. Jackson', 'jackson@byui.edu', '208-493-3771', 'assets/images/blankProfessor.jpg', null),
    new Contact('2', 'Bro. Barzee', 'barzeer@byui.edu', '208-496-3768', 'assets/images/blankProfessor.jpg', null)
  ];
  ngOnInit(): void {}

  onSelected(contact: Contact){
    this.selectedContactEvent.emit(contact);
  }
}
