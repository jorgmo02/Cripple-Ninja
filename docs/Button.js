export default class Button extends Phaser.GameObjects.Sprite{

    constructor(scene, x,y, sprite, ninja){

        super(scene, x, y, sprite);
        this.setInteractive();

        this.ninja = ninja;

        console.log("boton creado");
        scene.add.existing(this);
        this.mouse = scene.input.activePointer;

        this.on('pointerdown', mouse => {
            if (mouse.leftButtonDown()) {
                this.onClick();
            }
        } , this);

        /*this.on('pointerover', mouse => {
            //this.HacerQueBrille();
        } );*/
    }

    preUpdate(){
        
    }

    onClick() {
        this.ninja.Jump();
        this.Hide();
    }

    Hide(){
        this.setVisible(false);
        this.setActive(false); 
    }
}
