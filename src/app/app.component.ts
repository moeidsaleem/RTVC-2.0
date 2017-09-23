import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var RTCMultiConnection: any;
import * as io from "socket.io-client";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  roomId='123';
  connection;
  socket:any = null;
  @ViewChild('local') loc:ElementRef;
  
  
  
  
  ngOnInit(){
    console.log('webRTC ng2');

 

  }


  openRoom(){
    console.log('final roomId , starting room with  ' +this.roomId)
  
    this.connection = new RTCMultiConnection();
    this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    this.connection.socketMessageEvent = 'audio-plus-screen-sharing-demo';
    this.connection.session = {
        audio: 'two-way', // merely audio will be two-way, rest of the streams will be oneway
        video: true,
        oneway: true
         };
         this.connection.sdpConstraints.mandotory = {
      OfferToReceiveAudio:true,
      OfferToReceiveVideo:true
    };
    this.connection.getScreenConstraints = function(callback) {
      this.getScreenConstraints(function(error, screen_constraints) {
          if (!error) {
              screen_constraints = this.connection.modifyScreenConstraints(screen_constraints);
              callback(error, screen_constraints);
              return;
          }
          throw error;
      });
  };    

  
  this.connection.onstream = function(event){
    if(event.type === 'remote'){
     this.remote.appendChild(event.mediaElement);
    }
    if(event.type === 'local'){
    console.log(event.mediaElement);
    this.local.nativeElement.appendChild ="something";
    
    }
  
   }
       this.connection.open(this.roomId);
  
      

}

}
