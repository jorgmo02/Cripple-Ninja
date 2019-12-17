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
        this.load.image('patronesTilemap', './resources/sprites/Tilesets/ChineseTemple18x12.png');
        this.load.image("Yakuza", './resources/Yakuza.png');
        this.load.image('VisionTrigger','./resources/TemporaryTriggerVision.png');
        this.load.image('Pinchos', './resources/TemporaryTrap.png');
        this.load.image('Dron', './resources/temporaryDrone.jpg');
        this.load.image('Camara', './resources/sprites/camera.png')
;        this.load.image('RestartButton', './resources/RestartButton.png');
        this.load.image('defNinja', './resources/sprites/player/run/imgs/tile000.png');
        this.load.image('defYakuza', './resources/sprites/yakuza/yakuza base.png');
        this.load.image('levelbackground', './resources/maps/backgrounds/background1.png');


        //Carga spritesheet
        this.load.spritesheet('animationTry', './resources/sprites/player/run/run.png', { frameWidth: 300, frameHeight: 350 });
        this.load.spritesheet('fallingNinja', './resources/sprites/player/falling/falling.png', { frameWidth: 300, frameHeight: 350 });
        this.load.spritesheet('runningYakuza', './resources/sprites/yakuza/walking/walking.png', {frameWidth: 300, frameHeight:300 });
        this.load.spritesheet('jumpingNinja', './resources/sprites/player/jump/spritesheet saltoAnim.png', {frameWidth:300 ,frameHeight:350 });

        //Carga Tilemap
        this.load.tilemapTiledJSON('tilemap', this.jsonString);

        //Desactivar menú contextual clic derecho
        this.input.mouse.disableContextMenu();
    }


    create(){
        //Animaciones
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('animationTry'),
            frameRate: 40,
            repeat: -1
        });

        this.anims.create({
            key: 'YakuzaRun',
            frames: this.anims.generateFrameNumbers('runningYakuza'),
            frameRate: 20,
            repeat:-1,
        })

        this.anims.create({
            key: 'NinjaJump',
            frames: this.anims.generateFrameNumbers('jumpingNinja'),
            frameRate: 30,
            repeat: 0,
        })
        
        this.anims.create({
            key: 'NinjaFall',
            frames: this.anims.generateFrameNumbers('fallingNinja'),
            frameRate: 30,
            repeat: -1,
        })

        //Mapa
        this.map = this.make.tilemap({ 
            key: 'tilemap', 
        });

        //Layers del tilemap
        //LLAMAR A TODAS LAS LAYER EN TILES COMO ESTAS 
        let tileset = this.map.addTilesetImage('ChineseTemple18x12', 'patronesTilemap');

        //Background
        this.add.image(0,0, 'levelbackground').setOrigin(0,0);

        //Layers
        this.map.createStaticLayer('Detalles1', tileset,0,0);
        let groundLayer = this.map.createStaticLayer('Suelo', tileset,0,0);
        groundLayer.setCollisionBetween(0,999);
        let buttonLayer = this.map.getObjectLayer('Agarres')['objects'];
        let trapLayer = this.map.getObjectLayer('Trampas')['objects'];
        let EndLevel = this.map.getObjectLayer('FinJuego')['objects'];
        let camerasLayer = this.map.getObjectLayer('Camaras')['objects'];
        let droneLayer = this.map.getObjectLayer('Drones') ['objects'];
        let yakuzaLayer = this.map.getObjectLayer('Yakuzas')['objects'];
        this.map.createStaticLayer('Arboles2', tileset, 0,0);
        this.map.createStaticLayer('Arboles1', tileset, 0,0);
        
        //graphics
        this.graphics = this.add.graphics();

        //Ninja
        let miNinja = new Player (this, this.initNinjaX, this.initNinjaY, 'defNinja', this.levelJumps);
        this.ninja = miNinja;

        //Creación de los agarres
        buttonLayer.forEach(object => {
            let obj = new ObjetoAgarrable (this, object.x, object.y, 'button', miNinja, ()=>{
                miNinja.Jump(obj, obj.x, obj.y);
            });
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

        //Texto con el número de saltos restantes
        this.jumpsCounter = this.add.text(1100, this.cameras.main.y + 10, 'Jumps: ' + this.levelJumps, { fontFamily: 'Arial', fontSize: 50, color: '#641e16 ' }).setBackgroundColor('#cd5c5c');
        this.jumpsCounter.setScrollFactor(0);

        //Follow Player
        this.cameras.main.startFollow(miNinja);
        this.cameras.main.followOffset.x = -300;

        //Enemies
        this.playerDetection = this.physics.add.group();

        
        //Camaras
        camerasLayer.forEach(object =>{
            let obj = new SecurityCamera(this, object.x, object.y, 'Camara', miNinja, 'VisionTrigger');
        })

        
        //Drones
        droneLayer.forEach(object=>{
            new Dron(this, object.x, object.y, 'Dron', miNinja, 'VisionTrigger');
        })

        //Yakuzas
        yakuzaLayer.forEach(object=>{
            new Yakuza (this, object.x, object.y, 'defYakuza','invisible', miNinja, 'VisionTrigger');
        })
        
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

    actualizeJumpsText(nJumps){
        this.jumpsCounter.setText('Jumps: ' + nJumps);
    }
}