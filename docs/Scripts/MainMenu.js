
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

        //Boton
        let playButton = this.add.sprite(500, 450, 'startButton');
        playButton.setInteractive();
        playButton.on('pointerdown',() => {this.scene.start('main')});
        playButton.on('pointerover', ()=>{playButton.setScale(1.1);});
        playButton.on('pointerout', ()=>{playButton.setScale(1);});

    }
}