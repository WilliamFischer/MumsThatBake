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
      //console.log(values);
      let roomIDS = [];

      values.forEach(eachImg => {
        console.log(this.roomID + ' VS ' + eachImg['id'])
        if(this.roomID == eachImg['id']){
          console.log('MATCH FOUND')
          roomIDS.push(eachImg)
        }
      });

      setTimeout(()=>{
        console.log('loop complete;')
        console.log(roomIDS);

        if(roomIDS[0]){
          this.joinRoom();
        }else{
          this.createRoom();
        }
      }, 1500);


    });

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
      this.inRoom = false;

      this.checkForRooms = this.fireStore.doc('Rooms/' + this.roomID).valueChanges().subscribe(value => {
        console.log("UPDATE TO ROOM")
        console.log(value);

        if(value['usersInRoom']){
          this.inRoom = true;
        }else{
          this.inRoom = false;
        }

      });

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
