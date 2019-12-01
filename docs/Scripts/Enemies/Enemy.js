//import VisionTrigger from "../VisionTrigger.js"

export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite, ninja){
        super(scene, x, y, sprite);

        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.scene = scene;
        this.seeingPlayer = false;
        
    }

    create(){
        this.group = this.scene.add.Physicsgroup();
        this.physics.add.overlap(this.group, ninja.sprite, () => {
            this.seeingPlayer = true;
        });
    }
}