export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite, ninja){
        super(scene, x, y, sprite);

        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.group = this.physics.add.group();
        this.seeingPlayer = false;

        this.physics.add.overlap(this.group, ninja.sprite, (e) => {
            this.seeingPlayer = true;
        });
    }
}