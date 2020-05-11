import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { MessagingService } from 'src/app/_shared/services/messaging.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  constructor( public userSvc: UserService, private messagingSvc: MessagingService ) { }

  ngOnInit(): void {
    this.userSvc.loadMyColaborators();
  }

}
