
export default class MainMenu extends Phaser.Scene{
    constructor() {
        super({ key: 'mainMenu' });
    }
    preload(){
        this.load.image('background','./resources/MainMenuBackground.png');
        this.load.image( 'startButton', './resources/StartButton.png');
    }

    create(){
        //Fondo
        this.add.image(0,0, 'background').setOrigin(0,0);

        //Botón
        let playButton = this.add.sprite(500, 450, 'startButton').setScale(0.6);
        playButton.setInteractive();
        playButton.on('pointerdown',() => {this.scene.start('main')});

    }
}