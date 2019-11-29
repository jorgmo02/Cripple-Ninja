export default class Agarre extends Phaser.GameObjects.Sprite{

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
            this.ninja.HacerQueBrille(this.x, this.y);
        } );
    
        this.on('pointerout', mouse =>{
            this.ninja.LimpiarBrillitos();
        } );
    }

    onClick() {
        this.ninja.Jump(this);
    }

    Hide() {
        this.setVisible(false);
        this.setActive(false); 
    }
}
