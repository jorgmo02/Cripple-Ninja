
export default class MainMenu extends Phaser.Scene{
    constructor() {
        super({ key: 'mainMenu' });
    }
    preload(){
        this.load.image('background','./resources/MainMenuBackground.png');
        this.load.image( 'startButton', './resources/StartButton.png');
        this.load.audio('backgroundMusic', './resources/music/CherryBlossoms.ogg');
    }

    create(){
        //Por defecto, quitamos todo el audio que pudiese haber
        this.sound.stopAll();

        //Fondo
        this.add.image(0,0, 'background').setOrigin(0,0);

        //Music configuration
        const config = {
            mute: false,
            volume: 1,
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
        playButton.on('pointerdown',() => {this.scene.start('main')});
        playButton.on('pointerover', ()=>{playButton.setScale(1.1);});
        playButton.on('pointerout', ()=>{playButton.setScale(1);});

    }
}