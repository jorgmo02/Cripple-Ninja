import EnemyWithTriggerVision from './EnemyWithVisionTrigger.js';

export default class Dron extends EnemyWithTriggerVision{
    constructor(scene, x, y, EnemyType, miNinja){
        super(scene, x, y, EnemyType, miNinja, 0, 50, 25, 200);

        this.rangeY = 300;
        this.speedY = 150;
        this.body.setVelocityY(this.speedY);
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