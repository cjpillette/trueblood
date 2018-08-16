import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Point, PointId } from './data-points.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class DataPointsService {
  pointsCollection: AngularFirestoreCollection<Point>;
  limits: Observable<any>;
  points: Observable<Point[]>;
  pointDoc: AngularFirestoreDocument<Point>;
  point: Observable<Point[]>;
  editing = false;
  modPoint = new BehaviorSubject<any>(null);
  user: any;
  url: string;

  constructor(private afs: AngularFirestore) {
    this.user = firebase.auth().currentUser;
    this.url = `users/${this.user.uid}/blood/`;
    if (this.user) {
      this.pointsCollection = this.afs
      .collection(`users/${this.user.uid}/blood/hem/results`, ref => ref.orderBy('date', 'desc'));
      this.points = this.pointsCollection.snapshotChanges()
      .pipe(map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          data.date = new Date(data.date['seconds'] * 1000 );
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
    }
  }

  getPoints() {
    return this.points;
  }

  getSinglePointOf(collection) {
    return this.afs
      .collection(`${this.url}${collection}/results`, ref => ref.limit(1))
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

  getFullDataPoint(point: Point) {
    const fullDataPoint = {
      ...point,
      userId: localStorage.getItem('userUID')
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
