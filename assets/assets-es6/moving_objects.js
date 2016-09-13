import * as Utils from './utils';

class MovingObjects extends createjs.Shape {
  constructor (stage,game,options) {
    super();
    this.vel = Utils.randomVecOfLength(1);
    this.radius = options.radius;
    this.color = "rgb(0,255,0)";
    this.game = game;
    stage.addChild(this);
    this.updatePos = this.updatePos.bind(this);
    this.graphics.beginFill(this.color).drawCircle(0,0,this.radius);
    let randomPos = Utils.initialSetupRandomPos(900,500);
    this.x = randomPos[0];
    this.y = randomPos[1];
    return this;
  }

  updatePos() {
    this.x += this.vel[0];
    this.y += this.vel[1];
    this.bounceOffWalls.bind(this)();
  }

  bounceOffWalls() {
    let xLimit = this.stage.canvas.width;
    let yLimit = this.stage.canvas.height;
    if ((this.x + this.radius) > xLimit) {
      this.vel[0] = -Math.abs(this.vel[0]);
    }
    if ((this.y + this.radius) > yLimit) {
      this.vel[1] = -Math.abs(this.vel[1]);
    }
    if ((this.x - this.radius) < 0) {
      this.vel[0] = Math.abs(this.vel[0]);
    }
    if ((this.y - this.radius) < 0) {
      this.vel[1] = Math.abs(this.vel[1]);
    }
  }

  // reflectVelocity(normalVector) {
  //   let theta = Math.atan2(normalVector[1],normalVector[0]);
  //   let projection = Utils.dotProduct(normalVector, this.vel);
  //   let dVx = 2*projection*Math.cos(theta);
  //   let dVy = 2*projection*Math.sin(theta);
  //   this.vel[0] -= dVx;
  //   this.vel[1] -= dVy;
  // }

  reflectVelocity(normalVector) {
    // let theta = Math.atan2(normalVector[1],normalVector[0]);
    // let projection = Utils.dotProduct(normalVector, this.vel);
    // let dVx = 2*projection*Math.cos(theta);
    // let dVy = 2*projection*Math.sin(theta);
    this.vel[0] += normalVector[0];
    this.vel[1] += normalVector[1];
    this.vel = Utils.setVectorMagnitude(this.vel,1);
  }
}

export default MovingObjects;
