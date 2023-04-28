import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages$: Observable<Message[]>;
  message: string;

  constructor() {
    this.message = '';
    this.messages$ = new Observable<Message[]>(observer => {
      observer.next([{ text: 'Hello, how can I assist you today?', sender: 'bot' }]);
    });
  }


sendMessage() {
  if (this.message && this.message.trim() !== '') {
    this.messages$ = this.messages$.pipe(map((messages: any[]) => [...messages, { text: this.message, sender: 'user' }]));

    setTimeout(() => {
      this.messages$ = this.messages$.pipe(map(messages => [...messages, { text: 'Sorry, I don\'t understand. Can you please rephrase?', sender: 'bot' }]));
    }, 1000);

    this.message = '';
  }
}
}