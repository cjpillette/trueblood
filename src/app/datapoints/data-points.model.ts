
export interface Point {
  date?: Date;
  value?: number;
  upperLimit?: number;
  lowerLimit?: number;
  unit?: string;
}

export interface PointId extends Point {
  id: string;
}
