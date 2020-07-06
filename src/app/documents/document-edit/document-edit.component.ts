import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

//added document import; don't know if it is needed.
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

originalDocument: Document;
document: Document;
editMode: boolean = false;

documents: Document[] = [];
  id: string;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe ((params: Params) => {

        this.id = params.id;

    if (this.id === null || this.id === undefined) {
        this.editMode = false;
      return;
    }

    this.documentService.getDocument(this.id);

     if (this.originalDocument === null){
         return;
    }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
        console.log(JSON.parse(JSON.stringify(this.originalDocument)));
        // this.originalDocument = this.documentService.documents;
  })
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

  onSubmit(form: NgForm) {
    // const value = form.value;
    // const newDocument = new Document(value.id, value.name, value.description, value.url, value.children);
    let newDocument = new Document(this.id, form.value['name'], form.value['description'], form.value['url'], null);
    if (this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
    console.log(form);
  }

onCancel() {
  this.router.navigateByUrl('/documents');
}
  // getDocument(id: string): Document {
  //   for (const document of this.documents){
  //     if (document.id === id){
  //       return document;
  //     }
  //   }
  //   return null;
  // }



// )
// ngOnInit() {
//   this.route.params
//   .subscribe(
//     (params: Params) => {
//       this.id = params['id'];
//       this.document = this.documentService.getDocument(this.id);
//     }
//   );
//   this.nativeWindow = this.windowRefService.getNativeWindow();
// }
}
