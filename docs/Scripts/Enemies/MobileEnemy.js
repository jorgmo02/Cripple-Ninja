import Enemy from './Enemy.js';

export default class MobileEnemy extends Phaser.GameObjects.Container{
    constructor(scene, x, y, sprite,ninja, rangeX, rangeY, speedX, speedY, zoneX, zoneY, zoneSizeX, zoneSizeY){
        super(scene, x, y)
        this.add([new Enemy (scene,0,0, sprite, ninja), scene.add.zone(zoneX, zoneY, zoneSizeX, zoneSizeY).setOrigin(0,0)]);

        //Físicas
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);

        //Elementos del container
        this.enemySprite = this.list[0];
        this.visionTrigger = this.list[1];
        
        //Físicas del trigger
        scene.physics.world.enable(this.visionTrigger);
        this.visionTrigger.body.setAllowGravity(false);
        this.visionTrigger.body.moves = false;
        scene.addTiggerToPhysicsGroup(this.visionTrigger);

        this.enemySprite.setScale(0.25,0.25);

        //Atributos
        this.rangeX = rangeX;
        this.rangeY = rangeY;
        this.triggerInitX = zoneX;
        this.triggerInitY = zoneY;
        this.triggerSizeX = zoneSizeX;
        this.triggerSizeY = zoneSizeY;
        this.initX = this.x;
        this.initY = this.y;
        this.speedX = speedX;
        this.speedY = speedY;

        //Velocidad inicial
        this.body.setVelocity(this.speedX, this.speedY);
    }

    //Movimiento tanto vertical como horizontal, se controla con los parametros introducidos en la constructora del Yakuza/Dron
    Move(){
        if(this.initX + this.rangeX <= this.x){
            this.body.setVelocityX(-this.speedX);
            this.enemySprite.flipX = true;
            this.visionTrigger.x = -this.triggerInitX - this.triggerSizeX;
        }
        else if(this.initX >= this.x){
            this.body.setVelocityX(this.speedX);
            this.enemySprite.flipX = false;
            this.visionTrigger.x = this.triggerInitX;
        }

        if(this.initY + this.rangeY <= this.y){
            this.body.setVelocityY(-this.speedY);
        }
        else if(this.initY >= this.y){
            this.body.setVelocityY(this.speedY);
        }
    }
}