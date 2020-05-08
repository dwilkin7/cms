import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
@Component({
  selector: 'cms-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent implements OnInit {

  @Input() contact: Contact;
  
  constructor() { }

  ngOnInit(): void {
  }

}
