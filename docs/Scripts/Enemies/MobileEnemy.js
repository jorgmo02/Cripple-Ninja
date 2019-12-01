import Enemy from './Enemy.js';

export default class MobileEnemy extends Enemy{
    constructor(scene, x, y, sprite, ninja){
        super(scene, x, y, sprite, ninja);
        scene.add.existing(this);
        this.setScale(0.20, 0.20);
        this.range = 300;
        this.initX= x;
        this.initY = y;
        this.speed = 100;
        this.body.setVelocityX(this.speed);
    }

    preUpdate(){
        if(this.initX + this.range <= this.x){
            this.body.setVelocityX(-this.speed);
            this.flipX = true;
        }
        else if(this.initX > this.x){
            this.body.setVelocityX(this.speed);
            this.flipX = false;
        }
    }
}