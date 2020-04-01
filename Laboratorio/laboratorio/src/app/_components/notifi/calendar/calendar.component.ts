import { Component, OnInit } from '@angular/core';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Calendar } from 'src/app/_models/Calendar';
import { CalendarService } from 'src/app/_shared/services/calendar.service';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarItems: Calendar[];


  constructor(public dialog: MatDialog, public calendarSvc: CalendarService, private userSvc: UserService) { }

  ngOnInit(): void {
    this.calendarSvc.loadMyCalendar(this.userSvc.user['user']._id);
    // this.calendarSvc.loadMyCalendar("BLAHOS2");
    this.calendarSvc.$myCalendar.subscribe(data => this.calendarItems = data);
  }

  addItem() {
    const dialogRef = this.dialog.open(CalendarModalComponent, {
      width: '600px',
      data: {edit: true, item: new Calendar()}
    })
  }

  openCalendarItem(item) {
    const dialogRef = this.dialog.open(CalendarModalComponent, {
      width: '600px',
      data: {edit: false, item}
    })
  }

  formatString(item: String): String {
    if ( item.length > 30 ) {
      return item.substring(0, 30) + " ...";
    }

    return item;
  }

  done(id) {
    this.calendarSvc.doneItem(id);
  }

}
