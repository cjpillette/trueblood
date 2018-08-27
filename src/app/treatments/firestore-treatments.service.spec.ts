import { TestBed, inject } from '@angular/core/testing';

import { FirestoreTreatmentsService } from './firestore-treatments.service';

describe('FirestoreTreatmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestoreTreatmentsService]
    });
  });

  it('should be created', inject([FirestoreTreatmentsService], (service: FirestoreTreatmentsService) => {
    expect(service).toBeTruthy();
  }));
});
