import Game from './game.js';

export default class MainMenu extends Phaser.Scene{
    constructor() {
        super({ key: 'mainMenu' });

       
    }
    preload(){
        this.load.image('background','./resources/MainMenuBackground.png');
        this.load.image( 'startButton', './resources/StartButton.png');
    }

    create(){
        let background = this.add.image(0,0, 'background').setOrigin(0,0);
        this.cameras.main.setSize(background.width,background.height);

        let playButton = this.add.sprite(700, 600, 'startButton').setScale(0.75);
        playButton.setInteractive();
        playButton.on('pointerdown',() => {this.scene.start('main')});

    }
}