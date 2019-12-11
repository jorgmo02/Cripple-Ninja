import Player from './Player.js';
import Yakuza from './Enemies/Yakuza.js';
import ObjetoAgarrable from './ObjetoAgarrable.js';
import Dron from './Enemies/Dron.js';
import SecurityCamera from './Enemies/SecurityCamera.js';

export default class LevelScene extends Phaser.Scene{
    constructor(mapJson, LevelKey, ninjaX, ninjaY, levelJumps){
        super({ key: LevelKey });
        this.jsonString = mapJson;
        this.initNinjaX = ninjaX;
        this.initNinjaY = ninjaY;
        this.levelJumps = levelJumps;
    }

    preload(){
        //Carga imágenes
        this.load.image("button", "./resources/play.png");
        this.load.image("invisible", "./resources/Transparente.png");
        this.load.image('ninja', './resources/CrippleNinja.png');
        this.load.image('patronesTilemap', './resources/maps/TileSetPrueba.png');
        this.load.image("Yakuza", './resources/Yakuza.png');
        this.load.image('VisionTrigger','./resources/TemporaryTriggerVision.png');
        this.load.image('Pinchos', './resources/TemporaryTrap.png');
        this.load.image('Dron', './resources/temporaryDrone.jpg');
        this.load.image('RestartButton', './resources/RestartButton.png');

        //Carga Tilemap
        this.load.tilemapTiledJSON('tilemap', this.jsonString);

        //Desactivar menú contextual clic derecho
        this.input.mouse.disableContextMenu();
    }


    create(){
        //Mapa
        this.map = this.make.tilemap({ 
            key: 'tilemap', 
        });

        //Layers del tilemap
        //LLAMAR A TODAS LAS LAYER EN TILES COMO ESTAS 
        let tileset = this.map.addTilesetImage('TileSetPrueba', 'patronesTilemap');
        this.map.createStaticLayer('Cielo', tileset,0,0);
        let groundLayer = this.map.createStaticLayer('Suelo', tileset,0,0);
        let buttonLayer = this.map.getObjectLayer('Agarres')['objects'];
        let trapLayer = this.map.getObjectLayer('Trampas')['objects'];
        let EndLevel = this.map.getObjectLayer('FinJuego')['objects'];

        //graphics
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(50, "0xFF00FF", 1.0);
        this.graphics.fillStyle("0xFFFFFF", 1.0);

        //Ninja
        let miNinja = new Player (this, this.initNinjaX, this.initNinjaY, "ninja", this.levelJumps);
        this.ninja = miNinja;

        //Creación de los agarres
        buttonLayer.forEach(object => {
            let obj = new ObjetoAgarrable (this, object.x, object.y, 'button', miNinja);
            obj.setScale(object.width/500, object.height/500); //Esto no haría falta una vez que tuviesemos sprites definitivos
            obj.setOrigin(0.5,0.5);
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

        //Creación del trigger del fin del juego
        let endTrigger = this.physics.add.staticGroup();
        EndLevel.forEach(object=>{
            let trigger = this.add.sprite(object.x, object.y, 'invisible');
            trigger.setOrigin(0,0);
            endTrigger.add(trigger, [this]);
        });

        //Colision entre trampas y jugador
        this.physics.add.collider(miNinja, trampas, ()=>{
            this.NinjaDetected();
        });

        //Colision entre Trigger del fin del juego y el player
        this.physics.add.overlap(miNinja, endTrigger, ()=>{
            this.scene.start('mainMenu'); //Sería al siguiente nivel, pero de momento te lleva al menú principal
            console.log("Ganaste");
        });

        //Colisiones
        groundLayer.setCollisionBetween(0,10);
        this.physics.add.collider(miNinja, groundLayer);
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setSize(1400,800);

        //Boton de reiniciar nivel
        let restartButton = this.add.sprite(this.cameras.main.x,this.cameras.main.y + 10 , 'RestartButton');
        restartButton.setOrigin(0,0);
        restartButton.setScrollFactor(0); //Para que se mueva con la camara
        restartButton.setInteractive();
        restartButton.on('pointerdown',() => {this.scene.restart();});

        //Follow Player
        this.cameras.main.startFollow(miNinja);
        this.cameras.main.followOffset.x = -300;

        //Enemies
        //Esto hasta que en cada escena coloquemos a los enemigos en el mapa
        let posX = 500; let posY = 1300;
        this.playerDetection = this.physics.add.group();
        this.yakuzaContainer = new Yakuza(this, posX, posY, 'Yakuza', 'invisible', miNinja);
        this.droneContainer = new Dron(this, 300, 900, 'Dron', miNinja);
        this.cameraContainer = new SecurityCamera(this, 400, 900, 'Dron', miNinja);

        //Si detectan al ninja, se reinicia el nivel
        this.physics.add.overlap(miNinja, this.playerDetection, () =>{
            this.NinjaDetected();
        })
    }
    
    NinjaDetected(){
        this.ninja.isSeen = true;
        console.log("Ninja detectado");
        this.scene.restart();
    }

    addTiggerToPhysicsGroup(trigger){
        this.playerDetection.add(trigger);
    }

    
}