import MobileEnemy from './MobileEnemy.js';

export default class Dron extends MobileEnemy{
    constructor(scene, x, y, EnemyType, visionTrigger, miNinja){
        super(scene, x, y,EnemyType, visionTrigger, miNinja, 0, 300, 0, 50);
    }

    preUpdate(){
        super.Move();
    }
}