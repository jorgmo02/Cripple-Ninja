import Player from './Player.js';
import Button from './Button.js';
export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'main' });
    }

    preload() {
        //Carga imagenes
        this.load.image("button", "./resources/play.png");
        this.load.image('ninja', './resources/CrippleNinja.png');
        this.load.image('patronesTilemap', './resources/maps/TileSetPrueba.png');

        //Carga Tilemap
        this.load.tilemapTiledJSON('tilemap', './resources/maps/MapaBueno.json');

        //Desactivar menú contextual clic derecho
        this.input.mouse.disableContextMenu();
    }

    create() {
        //Mapa
        this.map = this.make.tilemap({ 
            key: 'tilemap', 
        });


        //Layers del tilemap
        let tileset = this.map.addTilesetImage('TileSetPrueba', 'patronesTilemap');
        let skyLayer = this.map.createStaticLayer('Cielo', tileset,0,0);
        let groundLayer = this.map.createStaticLayer('Suelo', tileset,0,0);
        let buttonLayer = this.map.getObjectLayer('Agarres')['objects'];
        
        //graphics
        
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(50, "0xFF00FF", 1.0);
        this.graphics.fillStyle("0xFFFFFF", 1.0);

        //Ninja
        let miNinja = new Player (this, 150, 700, "ninja", -1);
        
        //Creación de los "botones"
        let buttons = this.physics.add.staticGroup();
        buttonLayer.forEach(object => {
            let obj = new Button (this, object.x, object.y, 'button', miNinja);
            obj.setScale(object.width/500, object.height/500); 
            obj.setOrigin(0);                
            });

        //Colisiones
        groundLayer.setCollisionBetween(0,10);
        this.physics.add.collider(miNinja, groundLayer);
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setSize(1400,800);

        //Follow Player
        this.cameras.main.startFollow(miNinja);
        this.cameras.main.followOffset.x = -300;
    }
}
