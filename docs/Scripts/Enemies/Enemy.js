//import VisionTrigger from "../VisionTrigger.js"

export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite, ninja){
        super(scene, x, y, sprite);
        this.scene = scene;
        this.seeingPlayer = false;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        //this.setOrigin(0,0);
        
    }


    /*
    create(){
        this.group = this.scene.add.physicsGroup();
        this.physics.add.overlap(this.group, ninja.sprite, () => {
            this.seeingPlayer = true;
        });
    }*/
}