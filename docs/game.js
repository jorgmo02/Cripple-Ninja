export default class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'main' });


    }

    preload() {
        this.load.image("ninja", "../resources/ninja.jpg");
    }

    create() {
        let miNinja = new Phaser.GameObjects.Sprite(this, 700, 500, "ninja");
        this.add.existing(miNinja);
        //this.add.image(500, 100, "ninja");
    }

    update(time, delta) {

    }
}