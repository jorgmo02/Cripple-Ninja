import Enemy from './Enemy.js';
import VisionTrigger from '../VisionTrigger.js';

export default class MobileEnemy extends Phaser.GameObjects.Container{
    constructor(scene, x, y, sprite, visionTrigger,ninja, rangeX, rangeY, speedX, speedY){
        super(scene, x, y)
        this.add([new Enemy (scene,0,0, sprite, ninja),  new VisionTrigger(scene,100, 0, visionTrigger, ninja)]);
        this.setScale(0.20, 0.20);

        //Físicas
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);

        //Elementos del container
        this.enemySprite = this.list[0];
        this.visionTrigger = this.list[1];

        this.rangeX = rangeX;
        this.rangeY = rangeY;

        this.scene = scene;
        this.initX = this.x;
        this.initY = this.y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.body.setVelocity(this.speedX, this.speedY);

    }

    Move(){
        if(this.initX + this.rangeX <= this.x){
            this.body.setVelocityX(-this.speedX);
            this.enemySprite.flipX = true;
            this.visionTrigger.x = (-this.visionTrigger.returnPositionTriggerX()* this.visionTrigger.getScaleX());
        }
        else if(this.initX >= this.x){
            this.body.setVelocityX(this.speedX);
            this.enemySprite.flipX = false;
            this.visionTrigger.x = (this.visionTrigger.returnPositionTriggerX());
        }

        if(this.initY + this.rangeY <= this.y){
            this.body.setVelocityY(-this.speedY);
        }
        else if(this.initY >= this.y){
            this.body.setVelocityY(this.speedY);
        }

    }
}