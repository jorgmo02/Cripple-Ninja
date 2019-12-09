import EnemyWithTriggerVision from './EnemyWithVisionTrigger.js';
import ObjetoAgarrable from "../ObjetoAgarrable.js";

export default class Yakuza extends EnemyWithTriggerVision{
    constructor(scene, x, y, EnemyType, Agarre, miNinja)
    {
        super(scene,x,y,EnemyType, miNinja, 0, 0, 400, 50);
        
        //super(scene, x, y, EnemyType, miNinja, 600, 0, 100, 0, 0, 0, 400, 50);
        this.rangeX = 600;
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
            this.visionTrigger.x = -this.triggerInitX - this.triggerSizeX;
        }
        else if(this.initX >= this.x){
            this.body.setVelocityX(this.speedX);
            this.enemySprite.flipX = false;
            this.visionTrigger.x = this.triggerInitX;
        }
        
    }
}