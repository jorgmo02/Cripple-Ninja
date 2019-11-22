export default class Button extends Phaser.GameObjects.Sprite{

    constructor(scene, x,y, sprite, ninja) {

        super(scene, x, y, sprite);
        this.setInteractive();
        this.setOrigin(0.5)

        this.ninja = ninja;        
        this.setScale(0.25, 0.25);
        scene.add.existing(this);
        this.mouse = scene.input.activePointer;

        this.on('pointerdown', mouse => {
            if (mouse.leftButtonDown()) {
                this.onClick();
            }
        } , this);

        this.on('pointerover', mouse => {
            ninja.HacerQueBrille(this.x, this.y);
        } );
    }

    onClick() {
        this.ninja.Jump(this.x, this.y);
    }

    Hide() {
        this.setVisible(false);
        this.setActive(false); 
    }
}
