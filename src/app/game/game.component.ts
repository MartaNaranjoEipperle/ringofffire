import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPlayerComponent } from '../dialog-player/dialog-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { identity } from 'rxjs';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameOver = false;
  game!: Game;
  gameId!: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];


      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard
        });

    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(this.game.stack.length == 0){
      this.gameOver = true;
    }
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false
        this.saveGame();
      }, 800);
    }
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if(change == 'DELETE'){
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        }
        
        else{
        this.game.player_images[playerId] = change;
        this.saveGame();
        }
      }
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('player_1.jpeg');
        this.saveGame();
      }
    });
  }


  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}
