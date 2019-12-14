import EnemyWithTriggerVision from './EnemyWithVisionTrigger.js';
import ObjetoAgarrable from "../ObjetoAgarrable.js";

export default class Yakuza extends EnemyWithTriggerVision{
    constructor(scene, x, y, EnemyType, Agarre, miNinja, VisionTrigger)
    {
        super(scene,x,y,EnemyType, miNinja, 0, 0, 300, 50, VisionTrigger);

        this.enemySprite.setDisplaySize(240, 200);
        this.enemySprite.play('YakuzaRun');
        console.log(this.enemySprite);
        this.rangeX = 600;
        this.visionTrigger.setOrigin(0,0);
        this.ninja = miNinja;
        this.speedX = 100;
        //Añadimos al container el agarre del yakuza        
        let agarre = new ObjetoAgarrable(scene, 0, 0, Agarre, miNinja, (()=> { miNinja.Jump(agarre, this.x, this.y); }));
        this.add([ agarre]);
        this.agarre = agarre;
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
        this.agarre.setObj(this.x, this.y);
    }
}