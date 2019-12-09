import MobileEnemy from './MobileEnemy.js';

export default class Dron extends MobileEnemy{
    constructor(scene, x, y, EnemyType, miNinja){
        super(scene, x, y, EnemyType, miNinja, 0, 300, 0, 150, 0, 50, 25, 200);
    }

    preUpdate(){
        super.Move();
    }
}