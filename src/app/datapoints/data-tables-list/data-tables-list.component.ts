import { Component, OnInit } from '@angular/core';
import { DataSelectionService } from './../data-selection.service';

@Component({
  selector: 'app-data-tables-list',
  templateUrl: './data-tables-list.component.html',
  styleUrls: ['./data-tables-list.component.css']
})
export class DataTablesListComponent implements OnInit {
  selection = [];
  bloodChecks = [
    { name: 'hem', checked: false },
    { name: 'hglb', checked: false },
    { name: 'htrc', checked: false },
    { name: 'vgm', checked: false },
    { name: 'tcmh', checked: false },
    { name: 'ccmh', checked: false },
    { name: 'ferrite', checked: false },
    { name: 'fer-serique', checked: false }
  ];

  constructor(private dataSelectionService: DataSelectionService) { }

  ngOnInit() {
  }

  showDataCollection(e, name) {
    const selectionArray = [];
      for (const value of this.bloodChecks) {
        if (value.name === name) {
          value.checked = e.checked;
        }
        selectionArray.push(value);
      }
      this.selection = selectionArray
        .filter(a => a.checked)
        .map(b => b.name);
      this.dataSelectionService.showPointsFor(this.selection);
  }

}
