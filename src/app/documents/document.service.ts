import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) { 
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

//getMaxId()
  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents){
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  //addDocument()
  addDocument(newDocument: Document){
    if (!newDocument){
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    this.storeDocuments();
  
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
  }

 //updateDocument
 updateDocument(originalDocument: Document, newDocument: Document){
  if(!originalDocument || !newDocument){
    return;
  }
  const pos = this.documents.indexOf(originalDocument);
  if(pos < 0){
    return;
  }
  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;

  this.storeDocuments();
  // const documentsListClone = this.documents.slice();
  // this.documentListChangedEvent.next(documentsListClone);
}

//deleteDocument
deleteDocument(document: Document){
  if(!document){
    return;
  }

  const pos = this.documents.indexOf(document);

  if(pos < 0){
    return;
  }
  this.documents.splice(pos, 1);
  this.storeDocuments();
  //this.documentListChangedEvent.next(this.documents.slice());
}

  //getDocuments()
  // getDocuments(): Document[]{
  //   return this.documents.slice();
  // }
  getDocuments() {
    this.http.get('https://cms-wdd430.firebaseio.com/documents.json')
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getDocument(id: string): Document {
    for (const document of this.documents){
      if (document.id === id){
        return document;
      }
    }
    return null;
  }


  //store contacts
  storeDocuments() {
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('https://cms-wdd430.firebaseio.com/documents.json', documents, { headers: headers })
    .subscribe(
      () => {
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
  }


  //function that deletes documents
  // deleteDocument(document: Document){
  //   if (document === null){
  //     return;
  //   }

  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0){
  //     return;
  //   }

  //   this.documents.splice(pos, 1);
  //   this.documentListChangedEvent.next(this.documents.slice());
  // }

}
