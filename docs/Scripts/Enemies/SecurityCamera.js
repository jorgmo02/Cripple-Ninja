import EnemyWithVisionTrigger from "./EnemyWithVisionTrigger.js";

export default class SecurityCamera extends EnemyWithVisionTrigger{
    constructor(scene, x, y, EnemyType, miNinja){
        super(scene, x, y, EnemyType, miNinja, 0, 50, 25, 150);
        
        //Angulos entre los que se va a mover
        this.maxrotation = 30;
        this.minrotation = -this.maxrotation;
        this.speed = 50;
        this.body.angularVelocity = this.speed;
        
    }

    preUpdate(){
        
        if(this.angle> this.maxrotation)this.body.angularVelocity = -this.speed;
        else if(this.angle <this.minrotation) this.body.angularVelocity = this.speed;
    }
}