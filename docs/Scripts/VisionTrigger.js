export default class VisionTrigger extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, sizeX, sizeY){
        
        super(scene,x,y, [sizeX], [sizeY]);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.body.moves = false;
        this.initX = x;
        this.initY = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    returnPositionTriggerX(){return this.initX;}

    getScaleX(){return this.scaleX;}
}