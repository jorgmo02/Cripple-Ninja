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
        this.background.setOrigin(0,0);

        this.physics.world.setBounds(0,0,2*1920,1080);
        this.cameras.main.setBounds(0,0,2*1920,1080);

        this.cameras.main.setSize(1400,800);
        
        
        let miNinja = new Player (this, 700, 500, "ninja", 6);

        this.cameras.main.startFollow(miNinja);
        this.cameras.main.followOffset.x = -300;
        
        //this.miNinja.Hide();

        let button = new Button(this, 700, 375, 'button', miNinja);
    }

    noDejarQueEscape() {
        this.input.mouse.requestPointerLock();
    }

    update(time, delta) {

    }
}
