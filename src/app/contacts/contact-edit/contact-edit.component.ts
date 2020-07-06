import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
//contact: Contact = null;
contact: Contact;
groupContacts: Contact[] = [];
editMode: boolean = false;
//hasGroup: boolean = false;
//Cancel: boolean;
originalContact: Contact;
id: string;


  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe ((params: Params) => {

      this.id = params.id;

  if (this.id === null || this.id === undefined) {
      this.editMode = false;
    return;
  }

  this.contactService.getContact(this.id);

   if (this.originalContact === null){
       return;
  }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      //console.log(JSON.parse(JSON.stringify(this.originalContact)));
   if (this.originalContact.group) {
     this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
   }
   //this.originalContact = 
  });
}


// ngOnInit(): void {
//   this.route.params
//   .subscribe(
//     (params: Params) => {
//       this.id = params['id'];
//       this.contactService.getContact(this.id)
//         .subscribe(contactData => {
//           this.contact = contactData.contact;
//         });
//     }
//   );
// }

//Close the form
onCancel(){
  this.router.navigateByUrl('/contacts');
}

//Submit the form
onSubmit(form: NgForm) {
  const value = form.value;
  const newContact = new Contact(
    //'',
    value.id,
    value.name,
    value.email,
    value.phone,
    value.imageUrl,
    this.groupContacts
  );
    //let newContact = new Contact(this.id, form.value['name'], form.value['email'], form.value['phone'], form.value['imageUrl'], null);
    if (this.editMode){
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);

  }

  //Check to see if draggable contact is the same 
  isInvalidContact(newContact: Contact) {
    if (!newContact) { //if newContact has no value
      return true;
    }
    if (newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

addToGroup($event: any) {
  let selectedContact: Contact = $event.dragData;
  const invalidGroupContact = this.isInvalidContact(selectedContact);

  if (invalidGroupContact) {
    return;
  }
  this.groupContacts.push(selectedContact);
  //this.invalidGroupContact = false;
}

onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
    return;
  }
  this.groupContacts.splice(index, 1);
}
// onRemoveItem(idx: number) {
//   if (idx < 0 || idx >= this.groupContacts.length)
//   return;

//   this.groupContacts.splice(idx, 1);
//   this.invalidGroupContact = false;
// }

}
