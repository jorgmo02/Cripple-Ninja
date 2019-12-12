import Enemy from './Enemy.js';
import VisionTrigger from './../VisionTrigger.js'

export default class MobileEnemy extends Phaser.GameObjects.Container{
    constructor(scene, x, y, sprite,ninja, zoneX, zoneY, zoneSizeX, zoneSizeY, visionSprite){
        super(scene, x, y)
        //this.add([new Enemy (scene,0,0, sprite, ninja), scene.add.zone(zoneX, zoneY, zoneSizeX, zoneSizeY).setOrigin(0,0)]);
        this.add([new Enemy (scene,0,0, sprite, ninja),new VisionTrigger(scene,zoneX, zoneY, zoneSizeX, zoneSizeY, visionSprite)])
        //Físicas
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);

        //Elementos del container
        this.enemySprite = this.list[0];
        this.visionTrigger = this.list[1];
        
        //Físicas del trigger
        scene.physics.world.enable(this.visionTrigger);
        this.visionTrigger.body.setAllowGravity(false);
        this.visionTrigger.body.moves = false;
        scene.addTiggerToPhysicsGroup(this.visionTrigger);

        this.enemySprite.setScale(0.25,0.25);

        //Atributos
        this.initX = this.x;
        this.initY = this.y;
        
    }

}