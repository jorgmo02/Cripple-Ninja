export default class VisionTrigger extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sizeX, sizeY, sprite){
        
        super(scene,x,y, sprite);
        this.setDisplaySize(sizeX, sizeY);
        this.setAlpha(0.5);
        
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.initX = x;
        this.initY = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
}