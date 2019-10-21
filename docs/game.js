import Player from './Player.js';
export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'main' });
    }

    preload() {
        this.load.image("background", "../resources/background.png");
        this.load.image('ninja', '../resources/CrippleNinja.png');
    }

    create() {
        this.background = this.add.image(0, 0,'background');
        this.background.setScale(0.75,0.75);
        this.background.setOrigin(0,0);

        let miNinja = new Player (this, 700, 500, "ninja");
        this.add.existing(miNinja);
    }

    update(time, delta) {

    }
}
