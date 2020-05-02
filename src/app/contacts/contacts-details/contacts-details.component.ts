import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
@Component({
  selector: 'cms-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent implements OnInit {
  contacts: Contact[] = [
    new Contact('3', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-493-3771', 'assets/images/blankProfessor.jpg', null)
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
