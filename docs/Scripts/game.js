import Player from './Player.js';
import Agarre from './Agarre.js';
import MobileEnemy from './Enemies/MobileEnemy.js';
import Yakuza from './Enemies/Yakuza.js';
import VisionTrigger from './VisionTrigger.js';

export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'main' });
    }

    preload() {
        //Carga imagenes
        this.load.image("button", "./resources/play.png");
        this.load.image('ninja', './resources/CrippleNinja.png');
        this.load.image('patronesTilemap', './resources/maps/TileSetPrueba.png');
        this.load.image("Yakuza", './resources/Yakuza.png');
        this.load.image('VisionTrigger','./resources/TemporaryTriggerVision.png');
        this.load.image('Pinchos', './resources/TemporaryTrap.png');

        //Carga Tilemap
        this.load.tilemapTiledJSON('tilemap', './resources/maps/MapaBueno2.json');

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
        let trapLayer = this.map.getObjectLayer('Trampas')['objects'];
        
        //graphics
        
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(50, "0xFF00FF", 1.0);
        this.graphics.fillStyle("0xFFFFFF", 1.0);

        //Ninja
        let miNinja = new Player (this, 150, 700, "ninja", -1);
        this.ninja = miNinja;
        
        //Creación de los agarres
        //let agarres = this.physics.add.staticGroup(); //NO HACE FALTA PORQUE NO INTERACTÚAN FÍSICAMENTE
        buttonLayer.forEach(object => {
            let obj = new Agarre (this, object.x, object.y, 'button', miNinja);
            obj.setScale(object.width/500, object.height/500); //Esto no haría falta una vez que tuviesemos sprites definitivos
            obj.setOrigin(0);                
        });
        
        //Creación de las trampas
        let trampas = this.physics.add.staticGroup();
        trapLayer.forEach(object => {
            let obj = this.add.sprite(object.x, object.y, 'Pinchos');
            obj.setScale(object.width/500, object.height/500);//Esto no haría falta una vez que tuviesemos sprites definitivos
            obj.setSize(128,64); //Esto no haría falta una vez que tuviesemos sprites definitivos
            obj.setOrigin(0);
            trampas.add(obj, [this]);
            obj.body.setSize(50,50);
        });

        this.physics.add.collider(miNinja, trampas, ()=>{
            this.NinjaDetected();
        })
    

        //Colisiones
        groundLayer.setCollisionBetween(0,10);
        this.physics.add.collider(miNinja, groundLayer);
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setSize(1400,800);

        //Follow Player
        this.cameras.main.startFollow(miNinja);
        this.cameras.main.followOffset.x = -300;

        //Enemies
        this.yakuza = new MobileEnemy(this, 0, 0 , 'Yakuza');
        this.yakuzaVision = new VisionTrigger(this, 100, 0, 'VisionTrigger');
        this.yakuzaContainer = new Yakuza(this, 500, 1300, [this.yakuza, this.yakuzaVision]);
        
        //Overlap con el trigger
        this.physics.add.overlap(miNinja, this.yakuzaContainer.list[1], () => {
            this.NinjaDetected();
        });


    }

    NinjaDetected(){
        this.ninja.isSeen = true;
        console.log("Ninja detectado");
    }

    
}
