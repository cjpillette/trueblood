
export interface Point {
  checktype?: string;
  value?: number;
  date?: Date;
}

export interface PointId extends Point {
  id: string;
}
