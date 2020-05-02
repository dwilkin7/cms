import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
@Component({
  selector: 'cms-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact('1', 'Bro. Jackson', 'jackson@byui.edu', '208-493-3771', 'assets/images/blankProfessor.jpg', null),
    new Contact('2', 'Bro. Barzee', 'barzeer@byui.edu', '208-496-3768', 'assets/images/blankProfessor.jpg', null)
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
