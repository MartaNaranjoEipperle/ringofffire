import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-player',
  templateUrl: './dialog-player.component.html',
  styleUrls: ['./dialog-player.component.scss']
})
export class DialogPlayerComponent implements OnInit {
  name: string='';
  constructor(public dialogRef: MatDialogRef<DialogPlayerComponent>) { }

  ngOnInit(): void {
    
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
