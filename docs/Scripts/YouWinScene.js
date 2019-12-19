export default class LevelScene extends Phaser.Scene{
    constructor(){
        super({key: 'YouWin'});
    }

    create(){
        //Paramos música
        this.sound.stopAll();

        //Añadimos fondo
        this.add.image(0,0, 'YouWinScreen').setOrigin(0,0);

        //Botón para volver al menú principal
        let playButton = this.add.sprite(500, 450, 'startButton');
        playButton.setInteractive();
        playButton.on('pointerdown',() => {
            this.sound.stopAll();
            this.scene.start('mainMenu')});
        playButton.on('pointerover', ()=>{playButton.setScale(1.1);});
        playButton.on('pointerout', ()=>{playButton.setScale(1);});

    }
}