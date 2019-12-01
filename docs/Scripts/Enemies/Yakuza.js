import MobileEnemy from './MobileEnemy.js';
import VisionTrigger from '../VisionTrigger.js';

export default class Yakuza extends Phaser.GameObjects.Container{
    constructor(scene, x, y, EnemyType, VisionTrigger)
    {

        super(scene, x, y);
        
        //Añadimos al container
        this.add(EnemyType, VisionTrigger);
        
        //Físicas
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        
        //Referencias a los hijos
        this.enemySprite = this.list[0];//Array de objetos del container
        this.visionRange = this.list[1];
        
        //Atributos
        this.scene = scene;
        this.initX = this.x;
        this.initY = this.y;
        this.speed = 100;
        this.range = 400;
        this.body.setVelocityX(this.speed);
        this.movementLeft = false;
        
    }
    
    preUpdate(){

        if(this.initX + this.range <= this.x){
            this.body.setVelocityX(-this.speed);
            this.enemySprite.flipX = true;
            this.visionRange.x = -100;
        }
        else if(this.initX >= this.x){
            this.body.setVelocityX(this.speed);
            this.enemySprite.flipX = false;
            this.visionRange.x = 100;
        }

    }
}