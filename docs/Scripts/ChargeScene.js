export default class LevelScene extends Phaser.Scene{
    constructor(){
        super({key: 'LoadingScene'});
    }

    preload(){
        this.add.image(0,0, 'Controles').setOrigin(0,0).setOrigin(0,0);

        //Carga imágenes
        this.load.image("invisible", "./resources/Transparente.png");
        this.load.image('ninja', './resources/sprites/player/static.png');
        this.load.image('patronesTilemap', './resources/sprites/Tilesets/ChineseTempleExpandidoV218x12.png');
        this.load.image('VisionTrigger','./resources/sprites/TriggerVision.png');
        this.load.image('VisionYakuza','./resources/sprites/TriggerYakuza.png');
        this.load.image('Trap', './resources/sprites/trap/trap0.png');
        this.load.image('Dron', './resources/sprites/drone.png');
        this.load.image('Camara', './resources/sprites/camera.png');
        this.load.image('RestartButton', './resources/RestartButton.png');
        this.load.image('defYakuza', './resources/sprites/yakuza/yakuza base.png');
        this.load.image('YouWinScreen', './resources/YouWin.png');

        //Fondos de los niveles
        this.load.image('background1', './resources/maps/backgrounds/background1.png');
        this.load.image('background2', './resources/maps/backgrounds/background2.png');
        this.load.image('background3', './resources/maps/backgrounds/background5.png');

        //Carga spritesheet
        this.load.spritesheet('staticNinja', './resources/sprites/player/static.png', { frameWidth: 300, frameHeight: 350 });
        this.load.spritesheet('bendedNinja', './resources/sprites/player/idle agachado.png', { frameWidth: 300, frameHeight: 350 });
        this.load.spritesheet('runningNinja', './resources/sprites/player/run/running.png', { frameWidth: 300, frameHeight: 350 });
        this.load.spritesheet('fallingNinja', './resources/sprites/player/falling/falling.png', { frameWidth: 300, frameHeight: 350 });
        this.load.spritesheet('runningYakuza', './resources/sprites/yakuza/walking/walking.png', {frameWidth: 300, frameHeight:300 });
        this.load.spritesheet('jumpingNinja', './resources/sprites/player/jump/jumping.png', {frameWidth:300 ,frameHeight:350 });
        this.load.spritesheet('trapAnimation', './resources/sprites/trap/trapSpritesheet.png' , {frameWidth: 423, frameHeight: 249});


        //Carga Tilemap
        this.load.tilemapTiledJSON('tilemap','./resources/maps/Level1.json');
        this.load.tilemapTiledJSON('tilemap2','./resources/maps/Level2.2.json');
        this.load.tilemapTiledJSON('tilemap3','./resources/maps/Level3.json');

        
        //Audio
        this.load.audio('jumpSound', './resources/Sounds/jump.mp3');
        this.load.audio('seenSound', './resources/Sounds/detected.wav');
        this.load.audio('killSound', './resources/Sounds/kill.mp3');


        //Cuando se cargan todos los recursos, empieza el nivel 1
        this.load.on('complete', function () {
            this.sound.add('SceneSound').play();
            this.scene.start('Level1');
        }, this);


    }
}