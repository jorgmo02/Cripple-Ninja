
export default class MainMenu extends Phaser.Scene{
    constructor() {
        super({ key: 'mainMenu' });
        this.gameCharged = false;
    }
    preload(){
        this.load.image('background','./resources/MainMenuBackground.png');
        this.load.image( 'startButton', './resources/StartButton.png');
        this.load.audio('backgroundMusic', './resources/music/CherryBlossoms.ogg');
        this.load.audio('SceneSound', './resources/music/ZenGarden.ogg');
        this.load.image('Controles', './resources/Controles1000x600.png');
    }

    create(){

        //Fondo
        this.add.image(0,0, 'background').setOrigin(0,0);

        //Music configuration
        const config = {
            mute: false,
            volume: 0.25,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }; 

        let music = this.sound.add('backgroundMusic', config);
        music.play();

        
        

        //Boton
        let playButton = this.add.sprite(500, 450, 'startButton');
        playButton.setInteractive();
        playButton.on('pointerdown',() => {
            this.sound.stopAll();
            if(!this.gameCharged){this.scene.start('LoadingScene'); this.gameCharged = true;}
            else {this.sound.add('SceneSound', config).play();
                this.scene.start('Level1');}
        });
        playButton.on('pointerover', ()=>{playButton.setScale(1.1);});
        playButton.on('pointerout', ()=>{playButton.setScale(1);});

    }
}