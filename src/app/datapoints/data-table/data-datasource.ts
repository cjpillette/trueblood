import { Point } from './../data-points.model';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, finalize, catchError, take } from 'rxjs/operators';
import { Observable, merge, BehaviorSubject, of } from 'rxjs';
import { DataPointsService } from './../data-points.service';

export class PointsDataSource extends DataSource<Point> {
  pointsSubject = new BehaviorSubject<Point[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor( private dataPointsService: DataPointsService, public paginator: MatPaginator, public sort: MatSort) {
    super();
    this.dataPointsService.getPoints()
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
    .subscribe(points => {
      this.pointsSubject.next(points);
    });
  }

  get data(): Point[] {
    return this.pointsSubject.value;
  }

  connect(): Observable<Point[]> {
    const displayDataChanges = [
      this.sort.sortChange,
      this.paginator.page
    ];
    this.paginator.length = this.data.length;
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return this.pointsSubject.asObservable();
  }

  disconnect() {
    this.pointsSubject.complete();
    this.loadingSubject.complete();
  }

}

