import EnemyWithTriggerVision from './EnemyWithVisionTrigger.js';

export default class Dron extends EnemyWithTriggerVision{
    constructor(scene, x, y, EnemyType, miNinja, VisionTrigger){
        super(scene, x, y, EnemyType, miNinja, 0, 0, 25, 200, VisionTrigger);

        this.rangeY = 300;
        this.speedY = 150;
        this.body.setVelocityY(this.speedY);

        this.enemySprite.setOrigin(0.3,0);
        this.visionTrigger.setOrigin(-0.5, -0.25);
    }

    preUpdate(){
        if(this.initY + this.rangeY <= this.y){
            this.body.setVelocityY(-this.speedY);
        }
        else if(this.initY >= this.y){
            this.body.setVelocityY(this.speedY);
        }
    }
}