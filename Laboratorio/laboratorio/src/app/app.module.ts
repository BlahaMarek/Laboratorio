import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material.module';
import { ChatListComponent } from './_components/chat/chat-list/chat-list.component';
import { ChatItemComponent } from './_components/chat/chat-item/chat-item.component';
import { NavigationComponent } from './_components/navigation/navigation.component';
import { SharedModule } from './_shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './_shared/interceptors/TokenInterceptor';
import { CanActivateRouteGuard } from './_guards/can-activate-route.guard';
import { ReminderComponent } from './_components/notifi/reminder/reminder.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { ProjectListComponent } from './_components/project/project-list/project-list.component';
import { LoginComponent } from './_components/start/login/login.component';
import { SignupComponent } from './_components/start/signup/signup.component';
import { ResetComponent } from './_components/start/reset/reset.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { LabComponent } from './_components/lab/lab.component';
import { AddReportModalComponent } from './_components/notifi/add-report-modal/add-report-modal.component';
import { ProjectItemComponent } from './_components/project/project-item/project-item.component';
import { GroupChangerComponent } from './_components/group-changer/group-changer.component';
import { CalendarComponent } from './_components/notifi/calendar/calendar.component';
import { CalendarModalComponent } from './_components/notifi/calendar-modal/calendar-modal.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ProjectDetailComponent } from './_components/project/project-detail/project-detail.component';
import { NewProjectModalComponent } from './_components/project/new-project-modal/new-project-modal.component';
import { NewProjectDateModalComponent } from './_components/project/new-project-date-modal/new-project-date-modal.component';
import { ExperimentListComponent } from './_components/project/experiment-list/experiment-list.component';
import { ExperimentItemComponent } from './_components/project/experiment-item/experiment-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    ChatItemComponent,
    NavigationComponent,
    ReminderComponent,
    PageNotFoundComponent,
    ProjectListComponent,
    LoginComponent,
    SignupComponent,
    ResetComponent,
    ProfileComponent,
    LabComponent,
    AddReportModalComponent,
    ProjectItemComponent,
    GroupChangerComponent,
    CalendarComponent,
    CalendarModalComponent,
    ProjectDetailComponent,
    NewProjectModalComponent,
    NewProjectDateModalComponent,
    ExperimentListComponent,
    ExperimentItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    SharedModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  CanActivateRouteGuard,
  HttpClientModule,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
