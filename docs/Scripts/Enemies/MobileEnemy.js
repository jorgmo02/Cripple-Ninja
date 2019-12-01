import Enemy from './Enemy.js';

export default class MobileEnemy extends Enemy{
    constructor(scene, x, y, sprite, ninja){
        super(scene, x, y, sprite, ninja);
        scene.add.existing(this);
        this.setScale(0.20, 0.20);
    }
}