import EnemyWithVisionTrigger from "./EnemyWithVisionTrigger.js";

export default class SecurityCamera extends EnemyWithVisionTrigger{
    constructor(scene, x, y, EnemyType, miNinja, VisionTrigger){
        super(scene, x, y, EnemyType, miNinja, 0, 0, 40, 200, VisionTrigger);
        
        this.visionTrigger.setOrigin(0.25,-0.25);
        
        //Angulos entre los que se va a mover
        this.maxrotation = 10;
        this.minrotation = -this.maxrotation;
        this.speed = 10;
        this.body.angularVelocity = this.speed;
        
    }

    preUpdate(){
        
        if(this.angle> this.maxrotation)this.body.angularVelocity = -this.speed;
        else if(this.angle <this.minrotation) this.body.angularVelocity = this.speed;
    }
}