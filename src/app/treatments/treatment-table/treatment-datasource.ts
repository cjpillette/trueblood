import { Treatment } from '../treatment.model';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, finalize, catchError } from 'rxjs/operators';
import { Observable, merge, BehaviorSubject, of } from 'rxjs';
import { FirestoreTreatmentsService } from '../firestore-treatments.service';

export class TreatmentsDataSource extends DataSource<Treatment> {
  pointsSubject = new BehaviorSubject<Treatment[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private treatmentsService: FirestoreTreatmentsService, public paginator: MatPaginator, public sort: MatSort
  ) {
    super();
    this.treatmentsService.readTreatments()
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
    .subscribe(treatments => {
      this.pointsSubject.next(treatments);
    });
  }

  get data(): Treatment[] {
    return this.pointsSubject.value;
  }

  connect(): Observable<Treatment[]> {
    const displayDataChanges = [
      this.pointsSubject.asObservable(),
      this.sort.sortChange,
      this.paginator.page
    ];
    this.paginator.length = this.data.length;
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    // return this.pointsSubject.asObservable();
    return merge(...displayDataChanges).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {
    this.pointsSubject.complete();
    this.loadingSubject.complete();
  }

  private getPagedData(data: Treatment[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Treatment[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return compare(a.startDate, b.startDate, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

