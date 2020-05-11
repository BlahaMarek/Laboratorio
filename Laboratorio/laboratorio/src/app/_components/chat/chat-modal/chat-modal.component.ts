import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/User';
import { MessagingService } from 'src/app/_shared/services/messaging.service';
import { Observable } from 'rxjs';
import { Message } from 'src/app/_models/Message';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') scrollMe: ElementRef;
  messageText = "";
  person: User = null;
  messages = [];
  constructor(
    private _snackBar: MatSnackBar,
    public userSvc: UserService,
    public messageSvc: MessagingService,
    public dialogRef: MatDialogRef<ChatModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.person = data.person;
  }

  ngOnInit(): void {
    if (!!this.person) {

      this.messageSvc.getMessages(this.userSvc.user['user'].login, this.person.login).subscribe(data => {
        this.messages = data;
      })

      this.messageSvc.socket.on('private_chat', (data) => {
        var username = data.username;
        var message = data.message;
        if (this.person.login == username) {
          this.messages.push(message);
        }
      });

    } else {
      this.messageSvc.getGroupMessages().subscribe(data => {
        this.messages = data;
      })
      
      this.messageSvc.socket.on('group', (msg) => {
        console.log(msg);
        this.messageNotificator('Nová správa v spoločnej skupine. ', 'Zavrieť')
        this.messages.push(msg);
      });
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    } catch (err) { }
  }

  messageNotificator(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,
    });
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
    newMessage.message = this.messageText;
    newMessage.from = this.userSvc.user['user'].login;

    if (!!this.person) {
      newMessage.to = this.person.login;
      this.messageSvc.postMessage(newMessage).subscribe(data => {
        this.messageSvc.socket.emit('private_chat', {
          to: this.person.login,
          message: newMessage
        });
      });
    } else {
      newMessage.to = 'group';
      this.messageSvc.postMessage(newMessage).subscribe(data => {
        this.messageSvc.socket.emit('group', newMessage);
      });
    }

    this.messages.push(newMessage);
    this.messageText = "";
  }

  getFormatedDate(date) {
    const newDate = new Date(date).toLocaleString('en-GB');
    return newDate;
  }

  get getName() {
    return !!this.person ? this.person.login : 'Skupina'
  }
}
