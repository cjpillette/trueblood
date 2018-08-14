import { Point } from './../data-points.model';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { DataPointsService } from './../data-points.service';

export class PointsDataSource extends DataSource<Point> {
  data: Observable<Point[]>;
  pointsSubject = new BehaviorSubject<Point[]>([]);
  totalBanana: number;


  constructor( private dataPointsService: DataPointsService) {
    super();
    this.dataPointsService.getPoints()
    .subscribe(points => {
    this.pointsSubject.next(points);
    this.totalBanana = this.pointsSubject['_value'].length;
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<Point[]> {
    return this.pointsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.pointsSubject.complete();
  }


  // private getPagedData(data: Point[]) {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

  //   return data.splice(startIndex, this.paginator.pageSize);
  // }

  /**
   * TODO sort here with firebase methods
   */
  // private getSortedData(data: Point[]) {
  //   if (!this.sort.active || this.sort.direction === '') {
  //     return data;
  //   }

  //   return data.sort((a, b) => {
  //     const isAsc = this.sort.direction === 'asc';
  //     switch (this.sort.active) {
  //       case 'date': return compare(a.date, b.date, isAsc);
  //       case 'value': return compare(+a.value, +b.value, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
}

// function compare(a, b, isAsc) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
