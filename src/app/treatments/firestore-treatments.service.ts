import { Injectable } from '@angular/core';
import {
  AngularFirestore,
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Treatment } from './treatment.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTreatmentsService {
  user: any;
  url: string;

  constructor(private afs: AngularFirestore) {
    this.user = firebase.auth().currentUser;
    this.url = `users/${this.user.uid}/treatments`;
  }

  readTreatments() {
    return this.afs
    .collection(this.url, ref => ref.orderBy('date', 'desc'))
    .snapshotChanges()
    .pipe(map(action => {
      return action.map(a => {
        const data: Treatment = a.payload.doc.data();
        data.startDate = new Date(data.startDate['seconds'] * 1000 );
        data.endDate = new Date(data.endDate['seconds'] * 1000 );
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getFormattedDates(treatment: Treatment) {
    const formattedPoint = {
      ...treatment,
    };
    formattedPoint.startDate = new Date(formattedPoint.startDate);
    formattedPoint.endDate = new Date(formattedPoint.endDate);
    return formattedPoint;
  }

  writeTreatment(treatment: Treatment, id?: string) {
    if (id) {
      return this.afs.doc(`${this.url}/${id}`)
      .update(this.getFormattedDates(treatment));
    }
    return this.afs.collection(this.url)
      .add(this.getFormattedDates(treatment));
  }

  deleteTreatment(id) {
    this.afs.doc(`users/${this.user.uid}/treatments/${id}`).delete();
  }

}
