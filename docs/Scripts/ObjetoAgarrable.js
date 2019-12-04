import Agarre from "./Agarre.js"

export default class ObjetoAgarrable extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, sprite, ninja) {

        super(scene, x, y, sprite);
        this.setInteractive();
        this.setOrigin(0.5);

        this.agarre = new Agarre(scene, x, y, ninja);
        this.setScale(0.25, 0.25);
        scene.add.existing(this);
        this.mouse = scene.input.activePointer;

        this.on('pointerdown', mouse => {
            if (mouse.leftButtonDown()) {
                this.agarre.onClick();
            }
        } , this);

        this.on('pointerover', mouse => {
            this.agarre.ninja.HacerQueBrille(this.x, this.y);
        } );
    
        this.on('pointerout', mouse =>{
            this.agarre.ninja.LimpiarBrillitos();
        } );
    }

    Hide() {
        this.setVisible(false);
        this.setActive(false); 
    }
}