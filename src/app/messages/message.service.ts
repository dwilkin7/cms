import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
//import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  //messageChangeEvent = new EventEmitter<Message[]>();
  messageChangeEvent = new Subject<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;
  //maxMessageId: number;

  constructor(private http: HttpClient) { 
    //this.messages = MOCKMESSAGES;
    //this.initMessages();
  }

  sortAndSend() {
    this.messages.sort((a, b) => a.sender > b.sender ? 1 : b.sender > a.sender ? -1 : 0);
    this.messageChangeEvent.next(this.messages.slice());
  }
  //add message was this below:
  //addMessage(message: Message) {
    // this.messages.push(message);
    // this.messageChangeEvent.emit(this.messages.slice());
  //}

  //add message
  addMessage(message: Message) {
    if (!message){
      return;
    }
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    message.id = '';
    //const strDocument = JSON.stringify(document);

    this.http.post<{ message: Message }>('http://localhost:3000/messages', 
    message, {headers: headers})
    .subscribe(
      (responseData) => {
        //message._id = responseData.message._id;
        message.id = responseData.message.id;
        this.messages.push(message);
        this.sortAndSend();
      }
    );

    // this.maxMessageId++;
    // newMessage.id = this.maxMessageId.toString();
    // this.messages.push(newMessage);

    // this.storeMessages();
  }

  

  //get messages
  // getMessages(): Message[] {
  //   return this.messages.slice();
  // }
  getMessages() {
    this.http.get<{ message: string, messages: Message[]}>('http://localhost:3000/messages')
    .subscribe(
      (responseData) => {
        this.messages = responseData.messages;
        this.sortAndSend();
      },
      (error: any) => {
        console.log(error);
      }
    );
    }

  //get message
  // getMessage(id: string): Message {
  //   for (const message of this.messages) {
  //     if (message.id === id){
  //       return message;
  //     }
  //   }
  //   return null;
  // }
  getMessage(id: string) {
    return this.http.get<{ message: Message }>('http://localhost:3000/messages/' + id)
  }

  //getMaxId
  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages){
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

//initMessage
// initMessages(){
//   this.http.get('https://cms-wdd430.firebaseio.com/messages.json')
//     .subscribe(
//       (messages: Message[]) => {
//         this.messages = messages;
//         this.maxMessageId = this.getMaxId();
//         this.messages.sort((a, b) => (a.subject > b.sender) ? 1 : ((b.sender > a.sender) ? -1 : 0));
//         this.messageChangeEvent.next(this.messages.slice());
//       },
//       (error: any) => {
//         console.log(error);
//       }
//     );

// }

//store messages
storeMessages() {
  let messages = JSON.stringify(this.messages);
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  this.http.put('http://localhost:3000/messages/', messages, { headers: headers })
  .subscribe(
    () => {
      this.messageChangeEvent.next(this.messages.slice());
    }
  );
}


//save message *Probably don't need this because the storeMessage basically does it for us
// saveMessage(message: Message) {
//   if(!message) {
//     return;
//   }
//   const pos = this.messages.indexOf(message);

//   if(pos < 0){
//     return;
//   }
//   this.messages.splice(pos, 1);
//   this.storeMessages();
// }


}
