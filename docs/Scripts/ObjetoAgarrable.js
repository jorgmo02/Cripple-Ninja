export default class ObjetoAgarrable extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, sprite, ninja, accion) {

        super(scene, x, y, sprite);
        this.setInteractive();
        this.setOrigin(0.5);

        this.objx = this.x;
        this.objy = this.y;

        this.setScale(0.25, 0.25);
        scene.add.existing(this);
        this.mouse = scene.input.activePointer;

        this.on('pointerdown', mouse => {
            if (mouse.leftButtonDown()) {
                accion();
            }
        } , this);

        this.on('pointerover', mouse => {
            ninja.HacerQueBrille(this.objx, this.objy);
        } );
    
        this.on('pointerout', mouse =>{
            ninja.LimpiarBrillitos();
        } );
    }

    Hide() {
        this.setVisible(false);
        this.setActive(false); 
    }

    setObj(x, y) {
        this.objx = x; this.objy = y;
    }
}