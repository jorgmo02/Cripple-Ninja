import Player from './Player.js';
import Yakuza from './Enemies/Yakuza.js';
import ObjetoAgarrable from './ObjetoAgarrable.js';
import Dron from './Enemies/Dron.js';
import SecurityCamera from './Enemies/SecurityCamera.js';

export default class LevelScene extends Phaser.Scene{
    constructor(mapJson, LevelKey, ninjaX, ninjaY, levelJumps, backgroundImage, nextScene, tilemapKey, backgroundKey){
        super({ key: LevelKey });
        this.jsonString = mapJson;
        this.initNinjaX = ninjaX;
        this.initNinjaY = ninjaY;
        this.levelJumps = levelJumps;
        this.backgroundImage = backgroundImage;
        this.nextScene = nextScene;

        this.tilemapKey = tilemapKey;
        this.backgroundKey = backgroundKey;
    }

    preload(){
        //Desactivar menú contextual clic derecho
        this.input.mouse.disableContextMenu();
    }


    create(){
        //Audio
        this.jumpSound = this.sound.add('jumpSound'); 
        this.seenSound = this.sound.add('seenSound'); 
        this.killSound = this.sound.add('killSound'); 
        
        //Animaciones
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('runningNinja'),
            frameRate: 40,
            repeat: -1
        });
        
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('staticNinja'),
            frameRate: 40,
            repeat: -1
        });

        this.anims.create({
            key: 'bended',
            frames: this.anims.generateFrameNumbers('bendedNinja'),
            frameRate: 40,
            repeat: -1
        });

        this.anims.create({
            key: 'YakuzaRun',
            frames: this.anims.generateFrameNumbers('runningYakuza'),
            frameRate: 20,
            repeat:-1,
        });

        this.anims.create({
            key: 'NinjaJump',
            frames: this.anims.generateFrameNumbers('jumpingNinja'),
            frameRate: 40,
            repeat: 0,
        });
        
        this.anims.create({
            key: 'NinjaFall',
            frames: this.anims.generateFrameNumbers('fallingNinja'),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key:'TrapAnim',
            frames: this.anims.generateFrameNumbers('trapAnimation'),
            yoyo:true,
            frameRate: 4,
            repeat: -1,
        })

        //Mapa
        this.map = this.make.tilemap({ 
            key: this.tilemapKey, 
        });

        //Layers del tilemap
        //LLAMAR A TODAS LAS LAYER EN TILES COMO ESTAS 
        let tileset = this.map.addTilesetImage('ChineseTempleExpandidoV218x12', 'patronesTilemap');

        //Background
        this.add.image(0,0, this.backgroundKey).setOrigin(0,0);

        //Layers
        let groundLayer = this.map.createStaticLayer('Suelo', tileset,0,0);
        groundLayer.setCollisionBetween(0,999);
        let buttonLayer = this.map.getObjectLayer('Agarres')['objects'];
        let trapLayer = this.map.getObjectLayer('Trampas')['objects'];
        let EndLevel = this.map.getObjectLayer('FinJuego')['objects'];
        let camerasLayer = this.map.getObjectLayer('Camaras')['objects'];
        let droneLayer = this.map.getObjectLayer('Drones') ['objects'];
        let yakuzaLayer = this.map.getObjectLayer('Yakuzas')['objects'];
        this.map.createStaticLayer('Detalles', tileset, 0,0);
        this.map.createStaticLayer('Detalles1', tileset, 0,0);

        //graphics
        this.graphics = this.add.graphics();

        //Ninja
        let miNinja = new Player (this, this.initNinjaX, this.initNinjaY, 'ninja', this.levelJumps);
        this.ninja = miNinja;

        //Creación de los agarres
        buttonLayer.forEach(object => {
            let obj = new ObjetoAgarrable (this, object.x, object.y, 'invisible', miNinja, ()=>{
                miNinja.Jump(obj, obj.x, obj.y);
            }, false, buttonLayer);
            obj.setOrigin(0.5,0.5);
        });
            
        //Creación de las trampas
        let trampas = this.physics.add.staticGroup();
        trapLayer.forEach(object => {
            let obj = this.add.sprite(object.x, object.y, 'Trap').play('TrapAnim');
            obj.setDisplaySize(64,64); //Esto no haría falta una vez que tuviesemos sprites definitivos
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
            this.scene.start(this.nextScene); 
        });

        //Colisiones
        groundLayer.setCollisionBetween(0,10);
        this.physics.add.collider(miNinja, groundLayer);
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setSize(1000,600);

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
            new Yakuza (this, object.x, object.y, 'defYakuza','invisible', miNinja, 'VisionYakuza');
        })

        //Texto con el número de saltos restantes
        this.jumpsCounter = this.add.text(700, this.cameras.main.y + 10, 'Jumps: ' + this.levelJumps, { fontFamily: 'Arial', fontSize: 45, color: '#641e16 ' }).setBackgroundColor('#cd5c5c');
        this.jumpsCounter.setScrollFactor(0);

        //Boton de reiniciar nivel
        let restartButton = this.add.sprite(this.cameras.main.x +10 ,this.cameras.main.y + 10 , 'RestartButton');
        restartButton.setOrigin(0,0);
        let buttonScale = 0.5;
        restartButton.setScale(buttonScale);
        restartButton.setScrollFactor(0); //Para que se mueva con la cámara
        restartButton.setInteractive();
        restartButton.on('pointerdown',() => {this.scene.restart();});
        restartButton.on('pointerover',() => {restartButton.setScale(buttonScale + 0.03);});
        restartButton.on('pointerout',() => {restartButton.setScale(buttonScale);});
  
        
        //Si detectan al ninja, se reinicia el nivel
        this.physics.add.overlap(miNinja, this.playerDetection, () =>{
            this.NinjaDetected();
        })
    }
    
    NinjaDetected(){
        this.ninja.isSeen(this);
    }

    addTiggerToPhysicsGroup(trigger){
        this.playerDetection.add(trigger);
    }

    actualizeJumpsText(nJumps){
        this.jumpsCounter.setText('Jumps: ' + nJumps);
    }

    playJumpMusic(){
        this.jumpSound.play();
    }

    playKillMusic(){
        this.killSound.play();
    }

    playSeenMusic(){
        this.seenSound.play();
        let level = this;
        this.seenSound.once('complete', function(seenSound) {
            level.restartScene();});
    }

    restartScene(){
        this.scene.restart();
    }
}