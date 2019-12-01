export default class VisionTrigger extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, ninja){
        super(scene,x,y,sprite);
        scene.add.existing(this);
    }
}