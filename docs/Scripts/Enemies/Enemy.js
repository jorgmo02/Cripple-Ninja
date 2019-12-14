//import VisionTrigger from "../VisionTrigger.js"

export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite, ninja){
        super(scene, x, y, sprite);
        this.scene = scene;
        this.seeingPlayer = false;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        
    }

    preUpdate(t,d){
        super.preUpdate(t,d);
    }
}