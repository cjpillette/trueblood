import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog ) {}

  openDialog(component, withData?, from?) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

      if (from === 'blood' && withData) { // in editing data mode
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

      if (from === 'treatment' && withData) {
        dialogConfig.data = {
          id: withData.id,
          startDate: withData.startDate,
          endDate: withData.endDate,
          title: withData.title,
          description: withData.description
        };
      }

    this.dialog.open(component, dialogConfig);
  }

}
