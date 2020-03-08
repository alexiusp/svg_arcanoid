import { IDestructibleRect } from '../types';

export interface IBrickModel extends IDestructibleRect {
  type: EBrickType;
  color: string;
}

export enum EBrickType {
  Dead = 0,
  Single = 1,
  Double = 2,
  Triple = 3,
  Quadruple = 4,
  Dynamite = 5,
}
