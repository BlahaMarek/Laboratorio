import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { CalendarService } from 'src/app/_shared/services/calendar.service';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {
  calendarForm;

  constructor(
    public userSvc: UserService,
    private _snackBar: MatSnackBar,
    private calendarSvc: CalendarService,
    public dialogRef: MatDialogRef<CalendarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.calendarForm = new FormGroup({
      startDate: new FormControl({value: this.data.item.startDate, disabled: !this.data.edit} , [Validators.required]),
      micro: new FormControl({value: this.data.item.micro, disabled: !this.data.edit} , [Validators.required]),
      desc: new FormControl({value: this.data.item.desc, disabled: !this.data.edit}, [Validators.required]),
      period: new FormControl({value: this.data.item.period, disabled: !this.data.edit}, [Validators.required]),
      group: new FormControl({value: this.data.item.group, disabled: !this.data.edit}, [Validators.required]),
    });
  }

  save() {
    this.calendarSvc.addToCalendar({...this.calendarForm.value, badge: ''});
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onDelete() {
    this.calendarSvc.deleteItem(this.data.item._id);
    this.dialogRef.close();
  }

  get daysLeft(): String {
    const diffTime = Math.abs(new Date().getTime() - new Date(this.data.item.startDate).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return `${this.data.item.period - diffDays}`;
  }
}
