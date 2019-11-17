import Player from './Player.js';
import Button from './Button.js';
export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'main' });
    }

    preload() {
        //this.load.image("background", "./resources/background.png");
        this.load.image("button", "./resources/play.png");
        this.load.image('ninja', './resources/CrippleNinja.png');
        this.input.mouse.disableContextMenu();
        this.load.tilemapTiledJSON('tilemap', './resources/maps/MapaBueno.json');
        this.load.image('patronesTilemap', './resources/maps/TileSetPrueba.png');
    }

    create() {
        //this.background = this.add.image(0, 0,'background');
        //this.background.setOrigin(0,0);

        this.map = this.make.tilemap({ 
            key: 'tilemap', 
          });
        let tileset = this.map.addTilesetImage('TileSetPrueba', 'patronesTilemap');
       
        let skyLayer = this.map.createStaticLayer('Cielo', tileset,0,0);
        let groundLayer = this.map.createStaticLayer('Suelo', tileset,0,0);

        groundLayer.setCollisionBetween(0,10);
        
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setSize(1400,800);
        
        let miNinja = new Player (this, 150, 700, "ninja", 6);
        this.physics.add.collider(miNinja, groundLayer);

        this.cameras.main.startFollow(miNinja);
        this.cameras.main.followOffset.x = -300;

        let button = new Button(this, 700, 375, 'button', miNinja);
        let button2 = new Button(this, 1200, 500, 'button', miNinja);
        let button3 = new Button(this, 1400, 500, 'button', miNinja);

        let button5 = new Button(this, 900, 600, 'button', miNinja);
        let button4 = new Button(this, 400, 700, 'button', miNinja);
        let button6 = new Button(this, 900*4, 600, 'button', miNinja);

       //var debugGraphics = this.add.graphics();
       //this.map.renderDebug(debugGraphics);

    }

    noDejarQueEscape() {
        this.input.mouse.requestPointerLock();
    }

    update(time, delta) {
        //console.log(this.map);
        //console.log('Width in Pixels:' + this.map.widthInPixels);
        //console.log('Height in Pixels:' + this.map.heightInPixels);
        
    }
}
