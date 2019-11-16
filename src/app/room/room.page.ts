import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  roomID: string;
  waitingMode: boolean;
  inRoom: boolean;

  checkForRooms: any;
  roomIDS: any = [];

  constructor(
    public fireStore: AngularFirestore,
    public loadingController: LoadingController
  ) { }

  async presentLoading() {
    return await this.loadingController.create({
      message: 'Loading...'
    }).then(a => {
      a.present().then(() => {
        //console.log('loading presented');
      });
    });
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

  ngOnInit() {
    this.checkRoom();
  }

  checkRoom(){
    this.presentLoading();

    // STUFF IS NEEDED HERE!!
    this.roomID = window.location.pathname.replace('/room/', '')

    this.checkForRooms = this.fireStore.collection('Rooms').valueChanges().subscribe(values => {
      values.forEach(eachImg => {
        console.log(this.roomID + ' VS ' + eachImg['id'])
        if(this.roomID == eachImg['id']){
          if(eachImg['id']){
            console.log('MATCH FOUND')
            this.roomIDS.push(eachImg['id'])
          }
        }
      });
    });

    setTimeout(()=>{
      console.log('loop complete;')
      console.log(this.roomIDS);

      if(!this.roomIDS || !this.roomIDS[0]){
        this.createRoom();
      }else{
        this.joinRoom();
      }
    }, 2000);

  }

  createRoom(){
    let roomAddress = this.fireStore.doc('Rooms/' + this.roomID);

    roomAddress.set({
      dateSet: new Date(),
      id: this.roomID,
      usersInRoom: 1,
    },{
      merge: true
    }).then(() => {
      console.log('Room Added');
      this.doneChecking();
      this.waitingMode = true;

      setTimeout(()=>{
        this.checkForRooms = roomAddress.valueChanges().subscribe(value => {
          console.log("UPDATE TO ROOM")
          console.log(value);

          if(value['usersInRoom'] == 2){
            this.inRoom = true;
            this.waitingMode = false;
          }else{
            this.inRoom = false;
            this.waitingMode = true;
          }

        });
      }, 3000);

    });
  }

  joinRoom(){
    let roomAddress = this.fireStore.doc('Rooms/' + this.roomID);

    roomAddress.set({
      usersInRoom: 2,
    },{
      merge: true
    }).then(() => {
      console.log('Joined Room');
      this.doneChecking();
      this.waitingMode = false;
      this.inRoom = true;
    });
  }


  doneChecking(){
    this.dismissLoading();
    this.checkForRooms.unsubscribe();
  }



}
