import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-tables-list',
  templateUrl: './data-tables-list.component.html',
  styleUrls: ['./data-tables-list.component.css']
})
export class DataTablesListComponent implements OnInit {
  selectedChecks = [];
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

  constructor() { }

  ngOnInit() {
  }

  showDataCollection(e, name) {
    if (e.checked) {
      console.log('name', name);
    }
  }

}
