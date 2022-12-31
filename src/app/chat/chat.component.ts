import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase/compat/app';
import { ChatAdapter } from 'ng-chat';
import { map, Subscription, timer } from 'rxjs';
import { ChatMsgDTO } from '../models/chat';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent{
  @ViewChild("chatContainer", {static: false}) chatContainer!: ElementRef
  messageContent: string = '';
  currentUserId = this.apiService.currentUser.userId;
  constructor(
    public apiService: ApiService
  ) { }


  // ngAfterViewChecked(){
  //   this.scrollToBottom()
  // }

  onKey(event: any) { // without type info
    this.messageContent = event.target.value;
    // console.log(this.apiService.newMessage.message);
  }

  clearMessage(): void {
    this.messageContent = '';
  }

  async sendMessage(): Promise<void> {
    this.apiService.sendMessage(this.apiService.teamDetails.id, this.messageContent, this.apiService.userToken!);
    this.messageContent = '';
  }

  scrollToBottom(): void {
    this.chatContainer.nativeElement.scrollTop  =
    this.chatContainer.nativeElement.scrollHeight;
  }
}
