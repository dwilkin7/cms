import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
//import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
contacts: Contact[] = [];

contactListChangedEvent = new Subject<Contact[]>();
maxContactId: number;


  constructor(private http: HttpClient) { 
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
  }

  //sort and send
  sortAndSend() {
    this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
  
  //getContacts
  // getContacts(): Contact[] {
  //   return this.contacts.slice();
  // }
  // getContacts() {
  //   //https://cms-wdd430.firebaseio.com/contacts.json
  //   this.http.get('http://localhost:3000/contacts')
  //   .subscribe(
  //     (contacts: Contact[]) => {
  //       this.contacts = contacts;
  //       this.maxContactId = this.getMaxId();
  //       this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  //       this.contactListChangedEvent.next(this.contacts.slice());
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }
  getContacts() {
    this.http.get<{ message: string, contacts: Contact[]}>('http://localhost:3000/contacts')
    .subscribe(
      (responseData) => {
        this.contacts = responseData.contacts;
        this.sortAndSend();
      },
      (error: any) => {
        console.log(error);
      }
    );
    }
  
  //getMaxId
  // getMaxId(): number {
  //   let maxId = 0;
  //   for (const contact of this.contacts){
  //     let currentId = parseInt(contact.id);
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   }
  //   return maxId;
  // }

  //updateContact
  updateContact(originalContact: Contact, newContact: Contact){
    if(!originalContact || !newContact){
      return;
    }
    // const pos = this.contacts.indexOf(originalContact);
    // if(pos < 0){
    //   return;
    // }
    // newContact.id = originalContact.id;
    // this.contacts[pos] = newContact;

    // this.storeContacts();
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);

      const pos = this.contacts.findIndex(c => c.id === originalContact.id);
  if (pos < 0) {
    return;
  }
  newContact.id = originalContact.id;
  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  this.http.put('http://localhost:3000/contacts/' + originalContact.id,
  newContact, { headers: headers })
  .subscribe(
    (response: Response) => {
      this.contacts[pos] = newContact;
      this.sortAndSend();
    }
  );
  }

  //getContact
  // getContact(id: string): Contact {
  //   for (const contact of this.contacts) {
  //     if (contact.id === id){
  //       return contact;
  //     }
  //   }
  //   return null;
  // }
  getContact(id: string) {
    return this.http.get<{ message: string, contact: Contact }>('http://localhost:3000/contacts/' + id);
  }

//addContact
addContact(contact: Contact){
  if (!contact){
    return;
  }

  const headers = new HttpHeaders ({'Content_Type': 'application/json'});
    contact.id = '';
    //const strDocument = JSON.stringify(document);

    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts', 
    contact, {headers: headers})
    .subscribe(
      (responseData) => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      }
    );
  // this.maxContactId++;
  // newContact.id = this.maxContactId.toString();
  // this.contacts.push(newContact);

  // this.storeContacts();

  // const contactsListClone = this.contacts.slice();
  // this.contactListChangedEvent.next(contactsListClone);
}

//deleteContact
  deleteContact(contact: Contact){
    if(!contact){
      return;
    }

    // const pos = this.contacts.indexOf(contact);

    // if(pos < 0){
    //   return;
    // }
    // this.contacts.splice(pos, 1);
    // this.storeContacts();
    // this.contactListChangedEvent.next(this.contacts.slice());

    const pos = this.contacts.findIndex(c => c.id === contact.id);
if (pos < 0) {
  return;
}

this.http.delete('http://localhost:3000/contacts/' + contact.id)
.subscribe(
  (response: Response) => {
    this.contacts.splice(pos, 1);
    this.sortAndSend();
    //return response.json().obj;

  });
  }

  //store contacts
  // storeContacts() {
  //   let contacts = JSON.stringify(this.contacts);
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   this.http.put('https://cms-wdd430.firebaseio.com/contacts.json', contacts, { headers: headers })
  //   .subscribe(
  //     () => {
  //       this.contactListChangedEvent.next(this.contacts.slice());
  //     }
  //   );
  // }


  // storeContacts() {
  //   const contacts = this.contactService.getContacts();
  //   this.http
  //     .put(
  //       'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
  //       contacts
  //     )
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }

}
