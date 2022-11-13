import { Component, OnInit } from '@angular/core';
import { addDoc,Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor( private router: Router, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }



async newGame() { 
  let game = new Game;
   this.firestore
   .collection('games')
   .add( game.toJson() )
   .then((gameInfo: any) =>{
    this.router.navigateByUrl('/game/' + gameInfo.id);
   })
 
    //const coll = collection(this.firestore, 'games');
    //console.log("Doc:", coll);
    //let gameInfo = await addDoc (coll, { game: game.toJson()});
    //console.log(gameInfo);
    //
}

}