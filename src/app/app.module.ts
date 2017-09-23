import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { TeacherComponent } from './teacher/teacher.component';
const SocketConfig: SocketIoConfig = { url: 'http://localhost:8080', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule,
    SocketIoModule.forRoot(SocketConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule{


  
 }
