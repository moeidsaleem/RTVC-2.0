import { Component, AfterViewInit , ElementRef, ViewChild, Renderer } from '@angular/core';
declare var RTCMultiConnection: any;
import * as io from "socket.io-client";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {

  @ViewChild('local') local;
  @ViewChild('remote') remote;
  
  constructor(private renderer:Renderer,private elementRef:ElementRef){
    // var local = this.elementRef.nativeElement.querySelector('#local');
    

  }
  title = 'app';
  roomId='123';
  connection;
  socket:any = null;
  element;
  
  
  ngAfterViewInit(){
    let loc = this.local.nativeElement;
    let rem = this.remote.nativeElement;
    
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
        console.log(event.mediaElement);        
       rem.appendChild(event.mediaElement);
      }
      if(event.type === 'local'){
      console.log(event.mediaElement);
      loc.appendChild(event.mediaElement);
     // element.innerHTML ='<video src="'+event.mediaElement.src+'"></video>';
     // element.innerHTML ='adas'
      
      }
    
     }
    

 

  }


  openRoom(){
    console.log('final roomId , starting room with  ' +this.roomId)
       this.connection.open(this.roomId);
}

joinRoom(){
console.log(this.roomId);
// this.connection.checkPresence(this.roomId, function(isRoomExist, roomid) {
// if (isRoomExist === true) {
 this.connection.join(this.roomId);


// } else {
//   console.log('Error! Room Id not found!');
// }
// });

}

}
