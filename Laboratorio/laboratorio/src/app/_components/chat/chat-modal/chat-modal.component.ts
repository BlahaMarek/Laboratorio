import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/User';
import { MessagingService } from 'src/app/_shared/services/messaging.service';
import { Observable } from 'rxjs';
import { Message } from 'src/app/_models/Message';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit, OnDestroy {
  messageText = "";
  person: User = null;
  messages = null;
  constructor(
    public userSvc: UserService,
    public messageSvc: MessagingService,
    public dialogRef: MatDialogRef<ChatModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.person = data.person;
    }

    ngOnInit(): void {
      this.messageSvc.getMessages(this.userSvc.user['user'].login, this.person.login).subscribe(data => {
        this.messages = data;
      })
      console.log("sasda");
    }

    ngOnDestroy(): void {
    }
   
    onNoClick() {
      this.dialogRef.close();
    }
  
    send() {
      if (this.messageText.length == 0) {
        return;
      }

      const newMessage = new Message();
      newMessage.from = this.userSvc.user['user'].login;
      newMessage.to = this.person.login;
      newMessage.message = this.messageText;

      this.messageText = "";

      this.messageSvc.postMessage(newMessage).subscribe(data => {
        this.messages.push(data);
      });
    }
  
    getFormatedDate(date) {
      const newDate = new Date(date).toLocaleString('en-GB');
      return newDate;
    }
}
