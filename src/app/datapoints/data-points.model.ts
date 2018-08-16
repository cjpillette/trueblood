
export interface Point {
  date?: Date;
  value?: number;
  upperLimit?: number;
  lowerLimit?: number;
  unit?: string;
  checktype?: string;
  id?: string;
}

export interface PointId extends Point {
  id: string;
}
