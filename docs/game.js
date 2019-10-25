import Player from './Player.js';
import Button from './Button.js';
export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'main' });
    }

    preload() {
        this.load.image("background", "./resources/background.png");
        this.load.image("button", "./resources/play.png");
        this.load.image('ninja', './resources/CrippleNinja.png');
        this.input.mouse.disableContextMenu();
    }

    create() {
        this.background = this.add.image(0, 0,'background');
        this.background.setScale(0.75,0.75);
        this.background.setOrigin(0,0);

        
        let miNinja = new Player (this, 700, 500, "ninja");
        
        //this.miNinja.Hide();

        let button = new Button(this, 700, 375, 'button');
    }

    noDejarQueEscape()
    {
        this.input.mouse.requestPointerLock();
    }

    update(time, delta) {

    }
}
