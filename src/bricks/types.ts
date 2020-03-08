import { IRect } from '../types';

export interface IBrickModel extends IRect {
  type: EBrickType;
  health: number;
  color: string;
}

export enum EBrickType {
  Single = 1,
  Double = 2,
  Triple = 3,
  Quadruple = 4,
  Dynamite = 5,
}
