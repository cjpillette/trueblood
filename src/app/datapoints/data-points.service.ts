import { Injectable } from '@angular/core';
import {
  AngularFirestore,
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Point } from './data-points.model';
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
    return this.callToFirestore(
      `${this.url}${collection}/results`,
      ref => ref.orderBy('date', 'desc')
    );
  }

  readSinglePointOf(collection) {
    return this.callToFirestore(
      `${this.url}${collection}/results`,
      ref => ref.limit(1)
    );
  }

  getFormattedDatePoint(point: Point) {
    const formattedPoint = {
      ...point,
    };
    formattedPoint.date = new Date(formattedPoint.date);
    return formattedPoint;
  }

  writePoint(point: Point) {
    if (point.id) {
      return this.afs.doc(`${this.url}${point.checktype}/results/${point.id}`)
      .update(this.getFormattedDatePoint(point));
    }
    return this.afs.collection(`${this.url}${point.checktype}/results`)
      .add(this.getFormattedDatePoint(point));
  }

  deletePoint(pointId) {
    this.afs.doc('users/${this.user.uid}/blood/hem/results/' + pointId).delete();
  }
}
