export default class Button extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y, sprite){
        super(scene, x, y, sprite);

        console.log("boton creado");
        scene.add.existing(this);
        this.mouse = scene.input.activePointer;
        scene.input.on('pointerdown', mouse => {
            if (this.mouse.isDown) {
                //scene.noDejarQueEscape();
                this.onClick();
            }
        } );
    }

    preUpdate(){
        console.log('estás malito');
    }

    onClick()
    {
        this.Hide();
    }

    Hide(){
        this.setVisible(false);
        this.setActive(false);
        
    }
}
