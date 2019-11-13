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
        this.load.tilemapTiledJSON('tilemap', './resources/MaPatata.json');
        this.load.image('patronesTilemap', './resources/Tileset.tsx');
    }

    create() {
        //this.background = this.add.image(0, 0,'background');
        //this.background.setOrigin(0,0);

        this.map = this.add.tilemap({ 
            key: 'tilemap', 
            //tileWidth: 128, 
            //tileHeight: 128 
          });
        this.map.addTilesetImage('patrones', 'patronesTilemap');
        
        this.physics.world.setBounds(0,0,2*1920,1080);
        this.cameras.main.setBounds(0,0,2*1920,1080);

        this.cameras.main.setSize(1400,800);
        
        
        let miNinja = new Player (this, 700, 500, "ninja", 6);

        this.cameras.main.startFollow(miNinja);
        this.cameras.main.followOffset.x = -300;
        
        //this.miNinja.Hide();

        let button = new Button(this, 700, 375, 'button', miNinja);
        let button2 = new Button(this, 1200, 500, 'button', miNinja);
        let button3 = new Button(this, 1400, 500, 'button', miNinja);

        let button5 = new Button(this, 900, 600, 'button', miNinja);
        let button4 = new Button(this, 400, 700, 'button', miNinja);
        let button6 = new Button(this, 900*4, 600, 'button', miNinja);

    }

    noDejarQueEscape() {
        this.input.mouse.requestPointerLock();
    }

    update(time, delta) {

    }
}
