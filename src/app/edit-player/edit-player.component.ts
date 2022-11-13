import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  allProfilePicture = ['player_1.jpeg', 'player_2.jpeg', 'player_3.jpeg', 'player_4.jpeg']; 
  name: string='';
  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {  
  }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
