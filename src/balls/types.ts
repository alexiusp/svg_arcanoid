import { IPosition } from '../types';

export interface IBallModel extends IPosition {
  r: number;
  vx: number;
  vy: number;
}
