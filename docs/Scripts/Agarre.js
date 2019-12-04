export default class Agarre extends Phaser.GameObjects.GameObject{

    constructor(scene, x, y, ninja) {
        super(scene, x, y);
        this.x = x; this.y = y;
        scene.add.existing(this);
        this.ninja = ninja;
    }

    onClick() {
        this.ninja.Jump(this);
    }

    Hide() {
        this.setVisible(false);
        this.setActive(false); 
    }
}