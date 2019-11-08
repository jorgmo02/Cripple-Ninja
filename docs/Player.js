export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y, sprite, nJumps){
        super(scene, x, y, sprite);

        console.log("player creado");
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        scene.add.existing(this);
        this.mouse = scene.input.activePointer;
        this.speed = 500;
        this.jumpSpeed = -900;
        this.jumpsLeft = nJumps;
        this.offsetX = 5;
        this.camera = scene.cameras.main;

    }

    preUpdate(){ 
        if(this.mouse.rightButtonDown() && this.mouse.worldX-this.x >this.offsetX){
            this.body.setVelocityX(this.speed);
            this.flipX = false;
        }
        else if(this.mouse.rightButtonDown() && this.mouse.worldX-this.x < - this.offsetX){
            this.body.setVelocityX(-this.speed);
            this.flipX = true;
        }
        else if(this.mouse.rightButtonReleased())this.body.setVelocityX(0);

        this.mouse.updateWorldPoint(this.camera);
        
        //PseudoSalto
        if(this.mouse.leftButtonDown() && this.body.onFloor() && this.jumpsLeft > 0){
            this.body.setVelocityY(this.jumpSpeed);
            this.jumpsLeft--;
        }
    }

    ChangePos (newX,newY){
        console.log('cambio de posicion');
        this.FlipSprite(newX);
        this.x += newX*this.speed;
        this.y += newY*this.jumpSpeed;
    }

    Hide(){
        this.sprite.setAlpha(0);
    }
}
