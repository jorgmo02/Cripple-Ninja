import MobileEnemy from './MobileEnemy.js';
import ObjetoAgarrable from "../ObjetoAgarrable.js";

export default class Yakuza extends MobileEnemy{
    constructor(scene, x, y, EnemyType, visionTrigger, Agarre, miNinja)
    {
        super(scene, x, y,EnemyType, visionTrigger, miNinja, 600, 0, 100, 0, 100, 0 );

        //Añadimos al container el agarre del yakuza
        this.add([ new ObjetoAgarrable(scene, 0, 0, Agarre, miNinja)]);
        this.agarre = this.list[2];
    }
    
    preUpdate(){
       super.Move();
        
    }
}