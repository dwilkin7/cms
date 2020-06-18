import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  //First version
  //Was transform(contacts: any, ...args: unknown[]): unknown 
  // transform(contacts: Contact[], [term]) {
  //   let filteredArray: Contact[]  = [];

  //   for (let i=0; i<contacts.length; i++) {
  //     let contact = contacts[i];
  //     if(contact.name.toLowerCase().includes(term)) {
  //       filteredArray.push(contact);
  //     }
  //   }
  //   if (filteredArray.length < 1) {
  //     return contacts;
  //   }
  //   //was return null;
  //   return filteredArray;
  // }

  //alternative to first transform for-loop
  transform(contacts: Contact[], term: string): any {
    let filteredArray: Contact[]  = [];

    if (term && term.length > 0) {

    

    filteredArray = contacts.filter (
      (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
    );
    }

    // if (filteredArray.length < 1) {
    //   return contacts;
    // }
    //was return null;
    return filteredArray.length > 0 ? filteredArray : contacts;
  }

  // transform(term: any) {
  //   let filteredArray: Contact[] = [];

  //   filteredArray = term.filter (
  //     (term: any) => term.name.toLowerCase().includes(term.toLowerCase())
  //   );

  //   if (filteredArray.length < 1) {
  //     return term;
  //   }
  //   return filteredArray;
  // }

}
