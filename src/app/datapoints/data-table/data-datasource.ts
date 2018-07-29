import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface PointItem {
  date: Date;
  value: number;
}

const EXAMPLE_DATA: PointItem[] = [
  {date: new Date(2018, 6, 1), value: 13},
  {date: new Date(2018, 5, 1), value: 20},
  {date: new Date(2018, 4, 1), value: 3},
  {date: new Date(2018, 3, 1), value: 9},
  {date: new Date(2018, 2, 1), value: 11},
  {date: new Date(2018, 1, 1), value: 15},
  {date: new Date(2017, 12, 1), value: 20},
  {date: new Date(2017, 11, 1), value: 14},
  {date: new Date(2017, 10, 1), value: 12},
  {date: new Date(2017, 9, 1), value: 8},
  {date: new Date(2017, 8, 1), value: 9},
  {date: new Date(2017, 7, 1), value: 13},
  {date: new Date(2017, 6, 1), value: 10},
  {date: new Date(2017, 5, 1), value: 8},
  {date: new Date(2017, 4, 1), value: 7},
  {date: new Date(2017, 3, 1), value: 5},
  {date: new Date(2017, 2, 1), value: 9},
  {date: new Date(2017, 1, 1), value: 12},
  {date: new Date(2016, 12, 1), value: 16},
  {date: new Date(2016, 11, 1), value: 13},
];

export class PointsDataSource extends DataSource<PointItem> {
  data: PointItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PointItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData([...this.data]);
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PointItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * TODO sort here with firebase methods
   */
  private getSortedData(data: PointItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'value': return compare(+a.value, +b.value, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
