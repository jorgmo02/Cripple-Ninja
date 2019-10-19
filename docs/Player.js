export default class Game extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y, sprite){
        super(scene, x, y, sprite);

        console.log("player creado");
        //scene.physics.world.enable(this);
        scene.add.existing(this);
        this.mouse = scene.input.activePointer
    }

    preUpdate(){ 
        if(this.mouse.isDown){
            this.ChangePos(this.mouse.worldX - this.x, this.mouse.worldY-this.y, 0.03);
        }
    }

    ChangePos (newX, newY, speed){
        console.log('cambio de posiciĂ³n');
        this.FlipSprite(newX);
        this.x += newX*speed;
        this.y += newY*speed;
    }

    FlipSprite(newX){
        if(newX >=0) this.setScale(1,1);
        else this.setScale(-1,1);
    }
}