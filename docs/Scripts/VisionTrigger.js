export default class VisionTrigger extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, ninja,){
        
        super(scene,x,y,sprite);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.initX = x;
        this.scaleX = 7;
        this.scaleY = 3;
        this.setScale(this.scaleX,this.scaleY);
        this.setOrigin(0,0);
    }

    returnPositionTriggerX(){return this.initX;}

    getScaleX(){return this.scaleX;}
}