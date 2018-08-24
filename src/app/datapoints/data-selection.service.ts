import { Injectable } from '@angular/core';
import { DataPointsService } from './data-points.service';

@Injectable()
export class DataSelectionService {

  constructor(private dataPointsService: DataPointsService) {
  }

  showPointsFor(selection: Array<string>) {
    for (const collection of selection) {
      this.dataPointsService.readPointsOf(collection);
    }
  }
}
