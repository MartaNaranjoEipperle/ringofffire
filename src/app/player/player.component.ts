import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() name: string="";
  @Input() playerActive: boolean = false;
  playersImg: string[] = [];
  game!: Game;
  playerImg: string = '';

  constructor() { 
    for(let j = 1; j < 5; j++) {
            this.playersImg.push('player_'+j);
          }
          shuffle(this.playersImg);
  }

  ngOnInit(): void {
    
    this.playerImg = this.playersImg.pop()!;
  }

      
}

function shuffle(array: string[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle.
  while (0 !== currentIndex) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}