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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  CanActivateRouteGuard,
  HttpClientModule
],
  bootstrap: [AppComponent]
})
export class AppModule { }
