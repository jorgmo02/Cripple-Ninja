import Enemy from "./Enemy";

export default class MobileEnemy extends Phaser.GameObject.Container{
    constructor(scene, x, y, sprite, ninja){
        super(scene, x, y, sprite, ninja);
        
    }
}