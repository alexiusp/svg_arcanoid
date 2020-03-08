export interface IPosition {
  x: number;
  y: number;
}

export interface IRect extends IPosition {
  width: number;
  height: number;
}

export interface IDestructible {
  health: number;
}

export type IDestructibleRect = IRect & IDestructible;
