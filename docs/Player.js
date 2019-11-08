export default class Player extends Phaser.GameObjects.Sprite{

    constructor(scene, x,y, sprite, nJumps){
        super(scene, x, y, sprite);

        console.log("player creado");
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        scene.add.existing(this);
        this.mouse = scene.input.activePointer;
        this.speed = 500;
        this.jumpSpeed = -1.75;
        this.jumpsLeft = nJumps;
        this.offsetX = 20;
        this.offsetY = 50;
        this.jumping = false;
        this.attached = false;
        this.camera = scene.cameras.main;

    }

    preUpdate() {

        console.log(this.attached);
        
        if (!this.jumping && !this.attached)
        {
            let objX = this.mouse.worldX;
            if (this.mouse.rightButtonDown() && objX-this.x > this.offsetX) {
                this.body.setVelocityX(this.speed);
                this.flipX = false;
            }

            else if (this.mouse.rightButtonDown() && objX-this.x < - this.offsetX) {
                this.body.setVelocityX(-this.speed);
                this.flipX = true;
            }

            else if (this.mouse.rightButtonReleased())
                this.body.setVelocityX(0);
        }

        else if(this.jumping && this.attached) {
            
        }
        
        else if(this.body.velocity.y >= 0)
        {
            if (!this.onFloor) this.attached = true;
            this.ResetVelocity();
            this.body.setAllowGravity(false);
            this.jumping = false;
        }

        this.mouse.updateWorldPoint(this.camera);

        //console.log("X  : " + this.body.velocity.x);
        //console.log("Y  : " + this.body.velocity.y);

        /*if(this.body.velocity.y > -(this.jumpSpeed + this.offsetY) || (this.body.velocity.y === 0 && this.body.onFloor())) {

           this.jumping = false;
           this.body.setVelocityX(0);
        }
        
        //PseudoSalto
        /*if(this.mouse.leftButtonDown() && this.body.onFloor() && this.jumpsLeft > 0){
            this.body.setVelocityY(this.jumpSpeed);
            this.jumpsLeft--;
        }*/
    }

    ChangePos (newX,newY){
        console.log('cambio de posicion');
        this.FlipSprite(newX);
        this.x += newX*this.speed;
        this.y += newY*this.jumpSpeed;
    }

    Hide() {
        this.sprite.setAlpha(0);
    }

    Jump(x, y) {
        if ((this.body.onFloor() || (!this.jumping && this.attached)) && this.jumpsLeft > 0) {
            this.body.setAllowGravity(true);    
            let movX = x - this.x;
            this.jumping = true;
            this.body.setVelocityY((this.y - y) * this.jumpSpeed);
            this.body.setVelocityX(movX);
            this.flipX = (movX < 0);
            this.y -= 0.1;
            //this.jumpsLeft--;
        }
    }

    ResetVelocity(){
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
    }
}
