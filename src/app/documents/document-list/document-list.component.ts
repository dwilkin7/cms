import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
@Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'WDD 101', 'Intro to Web Development Course', 'https://byui.edu', null),
    new Document('2', 'CIT 260', 'Object Oriented Programming Course', 'https://byui.edu', null),
    new Document('3', 'CIT 230', 'Front End Development Course', 'https://byui.edu', null),
    new Document('4', 'CIT 225', 'Intro to Database Design and Development Course', 'https://byui.edu', null),
    new Document('5', 'WDD 430', 'Full Web Stack Development Course', 'https://byui.edu', null)
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}

/*
@Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact('1', 'Bro. Jackson', 'jackson@byui.edu', '208-493-3771', 'assets/images/blankProfessor.jpg', null),
    new Contact('2', 'Bro. Barzee', 'barzeer@byui.edu', '208-496-3768', 'assets/images/blankProfessor.jpg', null)
  ];

  onSelected(contact: Contact){
    this.selectedContactEvent.emit(contact);
  }
*/