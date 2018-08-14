import { Point } from './../data-points.model';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, finalize, catchError } from 'rxjs/operators';
import { Observable, merge, BehaviorSubject, of } from 'rxjs';
import { DataPointsService } from './../data-points.service';

export class PointsDataSource extends DataSource<Point> {
  data: Observable<Point[]>;
  pointsSubject = new BehaviorSubject<Point[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);
  totalBanana: number;

  public loading$ = this.loadingSubject.asObservable();

  constructor( private dataPointsService: DataPointsService) {
    super();
    this.dataPointsService.getPoints()
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
    .subscribe(points => {
    this.pointsSubject.next(points);
    this.totalBanana = this.pointsSubject['_value'].length;
    });
  }

  connect(): Observable<Point[]> {
    return this.pointsSubject.asObservable();
  }

  disconnect() {
    this.pointsSubject.complete();
    this.loadingSubject.complete();
  }

}

