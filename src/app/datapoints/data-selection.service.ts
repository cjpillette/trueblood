import { Injectable } from '@angular/core';
import { FirestoreBloodService } from './firestore-blood.service';

@Injectable({
  providedIn: 'root'
})
export class DataSelectionService {

  constructor(private bloodService: FirestoreBloodService) {
  }

  showPointsFor(selection: Array<string>) {
    for (const collection of selection) {
      this.bloodService.readPointsOf(collection);
    }
  }
}
