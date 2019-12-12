import EnemyWithTriggerVision from './EnemyWithVisionTrigger.js';
import ObjetoAgarrable from "../ObjetoAgarrable.js";

export default class Yakuza extends EnemyWithTriggerVision{
    constructor(scene, x, y, EnemyType, Agarre, miNinja, VisionTrigger)
    {
        super(scene,x,y,EnemyType, miNinja, 0, 0, 300, 50, VisionTrigger);
        
        this.rangeX = 600;
        this.visionTrigger.setOrigin(0,0);
    

        this.speedX = 100;
        //Añadimos al container el agarre del yakuza
        this.add([ new ObjetoAgarrable(scene, 0, 0, Agarre, miNinja)]);
        this.agarre = this.list[2];
        this.body.setVelocityX(this.speedX);
    }
    
    preUpdate(){

        if(this.initX + this.rangeX <= this.x){
            this.body.setVelocityX(-this.speedX);
            this.enemySprite.flipX = true;
            this.visionTrigger.x = -this.visionTrigger.initX - this.visionTrigger.sizeX;
        }
        else if(this.initX >= this.x){
            this.body.setVelocityX(this.speedX);
            this.enemySprite.flipX = false;
            this.visionTrigger.x = this.visionTrigger.initX;
        }
        
    }
}