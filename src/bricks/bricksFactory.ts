import { IBrickModel, EBrickType } from './types';
import { BRICK_WIDTH, BRICK_HEIGHT } from './constants';

/**
 * bricks factory produces bricks model objects according to given id and position
 * @param type type of the brick
 * @param x x position
 * @param y y position
 */
export default function buildBrick(type: EBrickType, x: number, y: number) {
  const brick: IBrickModel = {
    type,
    health: 1,
    x,
    y,
    width: BRICK_WIDTH,
    height: BRICK_HEIGHT,
    color: '',
  };
  switch (type) {
    case EBrickType.Single:
      brick.health = type as number;
      brick.color = 'single';
      break;
    case EBrickType.Double:
      brick.health = type as number;
      brick.color = 'double';
      break;
    case EBrickType.Triple:
      brick.health = type as number;
      brick.color = 'triple';
      break;
    case EBrickType.Quadruple:
      brick.health = type as number;
      brick.color = 'quadruple';
      break;
    case EBrickType.Dynamite:
      brick.health = 1;
      brick.color = 'dynamite';
  }
  return brick;
}
