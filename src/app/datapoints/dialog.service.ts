import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Injectable()
export class DialogService {

  constructor(public dialog: MatDialog ) {}

  openDialog(component, withData?) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    if (withData) {
      dialogConfig.data = {
        id: withData.id,
        date: withData.date,
        value: withData.value,
        upperLimit: withData.upperLimit,
        lowerLimit: withData.lowerLimit,
        unit: withData.unit,
        checktype: withData.checktype
      };
    }

    this.dialog.open(component, dialogConfig);
  }

}
