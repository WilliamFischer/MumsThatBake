import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.page.html',
  styleUrls: ['./join-room.page.scss'],
})
export class JoinRoomPage implements OnInit {

  room: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  joinRoom(){
    if(this.room.length >= 3){
      this.router.navigateByUrl('/room/' + this.room);
    }
  }

}
