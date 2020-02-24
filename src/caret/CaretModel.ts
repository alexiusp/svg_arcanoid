import { IModel, IPosition } from '../types';
import { VIEW_WIDTH, VIEW_HEIGHT } from '../constants';

const caretHeight = 20;
const caretWidth = 120;
const caretPosX = (VIEW_WIDTH - caretWidth) / 2;
const caretPosY = VIEW_HEIGHT - caretHeight;

export class CaretModel implements IModel, IPosition {
  static MAX_SPEED = 7;
  static STEP = 5;
  private speed: number = 0;
  public x: number = caretPosX;
  public y: number = caretPosY;
  public width: number = caretWidth;
  public height: number = caretHeight;

  private changeSpeed(delta: number) {
    const speed = this.speed + delta;
    this.speed =
      speed < 0
        ? Math.max(speed, -CaretModel.MAX_SPEED)
        : Math.min(speed, CaretModel.MAX_SPEED);
    return this.speed;
  }

  public moveLeft() {
    return this.changeSpeed(-1);
  }

  public moveRight() {
    return this.changeSpeed(+1);
  }

  update = () => {
    this.updateX();
  };

  public updateX = () => {
    const x = this.x + this.speed * CaretModel.STEP;
    this.x = Math.max(0, Math.min(x, VIEW_WIDTH));
    return this.x;
  }

  public reset = () => {
    this.x = caretPosX;
    this.y = caretPosY;
    this.width = caretWidth;
    this.height = caretHeight;
    this.speed = 0;
  }
}

export default new CaretModel();
