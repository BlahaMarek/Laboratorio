import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {
  @Input() person = null;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openChatModal() {
    let dialogRef = this.dialog.open(ChatModalComponent, {
      width: '600px',
      height: '500px',
      data: {person: this.person}
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  get getName() {
    return !!this.person ? this.person.login : 'Skupina'
  }
}
