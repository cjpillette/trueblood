import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Point, PointId } from './data-points.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataPointsService {
  pointsCollection: AngularFirestoreCollection<Point>;
  limits: Observable<any>;
  points: Observable<Point[]>;
  pointDoc: AngularFirestoreDocument<Point>;
  point: Observable<Point>;
  editing = false;
  modPoint = new BehaviorSubject<any>(null);
  user: any;

  constructor(private afs: AngularFirestore) {
    this.user = firebase.auth().currentUser;
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

  getFullDataPoint(point: Point) {
    const fullDataPoint = {
      ...point,
      userId: localStorage.getItem('userUID')
    };
    fullDataPoint.date = new Date(fullDataPoint.date);
    return fullDataPoint;
  }

  addPoint(point: Point) {
    this.afs.collection('blood')
      .add(this.getFullDataPoint(point));
  }

  updatePoint(point: Point, pointId: PointId) {
    this.pointDoc = this.afs.doc('users/${this.user.uid}/blood/hem/results/' + pointId);
    this.pointDoc.update(this.getFullDataPoint(point));
  }

  editPoint(point: Point, pointId: PointId) {
    this.editing = true;
    this.modPoint.next({point, pointId});
  }

  deletePoint(pointId) {
    this.afs.doc('users/${this.user.uid}/blood/hem/results/' + pointId).delete();
  }
}
