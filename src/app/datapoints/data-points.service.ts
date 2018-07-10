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
  points: any;
  pointDoc: AngularFirestoreDocument<Point>;
  point: Observable<Point>;
  editing = false;
  modPoint = new BehaviorSubject<any>(null);
  magic = '';

  constructor(private afs: AngularFirestore) {
    const user = firebase.auth().currentUser;
    if (user) {
      this.pointsCollection = this.afs.collection('blood', ref => ref.where('userId', '==', user.uid).orderBy('date', 'asc'));
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

  addPoint(point: Point) {
    const formattedPoint = { ...point};
    formattedPoint.date = new Date(formattedPoint.date);
    this.afs.collection('blood').add(formattedPoint);
  }

  updatePoint(point: Point, pointId: PointId) {
    this.pointDoc = this.afs.doc('blood/' + pointId);
    const formattedPoint = { ...point};
    formattedPoint.date = new Date(formattedPoint.date);
    this.pointDoc.update(formattedPoint);
  }

  editPoint(point: Point, pointId: PointId) {
    this.editing = true;
    this.modPoint.next({point, pointId});
  }

  deletePoint(pointId) {
    this.afs.doc('blood/' + pointId).delete();
  }
}
