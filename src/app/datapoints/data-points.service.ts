import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Point } from './data-points.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataPointsService {
  user: any;
  url: string;

  constructor(private afs: AngularFirestore) {
    this.user = firebase.auth().currentUser;
    this.url = `users/${this.user.uid}/blood/`;
  }

  callToFirestore(url, sort) {
    return this.afs
    .collection(url, sort)
    .snapshotChanges()
    .pipe(map(action => {
      return action.map(a => {
        const data: Point = a.payload.doc.data();
        data.date = new Date(data.date['seconds'] * 1000 );
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  readPointsOf(collection: string) {
    return this.callToFirestore(`${this.url}${collection}/results`, ref => ref.orderBy('date', 'desc'));
  }

  readSinglePointOf(collection) {
    return this.callToFirestore(`${this.url}${collection}/results`, ref => ref.limit(1));
  }

  getFullDataPoint(point: Point) {
    const fullDataPoint = {
      ...point,
    };
    fullDataPoint.date = new Date(fullDataPoint.date);
    return fullDataPoint;
  }

  writePoint(point: Point) {
    if (point.id) {
      return this.afs.doc(`${this.url}${point.checktype}/results/${point.id}`)
      .update(this.getFullDataPoint(point));
    }
    return this.afs.collection(`${this.url}${point.checktype}/results`)
      .add(this.getFullDataPoint(point));
  }

  deletePoint(pointId) {
    this.afs.doc('users/${this.user.uid}/blood/hem/results/' + pointId).delete();
  }
}
