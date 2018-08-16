import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Injectable()
export class DialogService {

  constructor(public dialog: MatDialog ) {}

  openDialog(component) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(component, dialogConfig);
  }

}
