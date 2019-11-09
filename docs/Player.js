let path;
let curve;

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
        this.objy = 0;
        this.camera = scene.cameras.main;
    }

    preUpdate() {
        //console.clear();
        //console.log(this.attached);
        //console.log("jumping: " + this.jumping);
        //console.log(this.body.onFloor());
        //console.log(this.y);

        if(this.jumping){
            curve.getPoint(path.t, path.vec);
            this.x = path.vec.x;
            this.y = path.vec.y;
        }

        if (this.body.onFloor())
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

            else this.body.setVelocityX(0);
        }
        
        if(this.attached && this.mouse.rightButtonDown()){
            this.attached = false;
            this.body.setAllowGravity(true);
        }

        this.mouse.updateWorldPoint(this.camera);

        /*else if((this.y - this.objy <= 20 && this.y - this.objy >= 0))//this.body.velocity.y >= 0)
        {
            this.body.setAllowGravity(false);
            this.ResetVelocity();
            this.jumping = false;
            this.attached = true;
        }*/


        //console.log("X  : " + this.body.velocity.x);
        //console.log("Y  : " + this.body.velocity.y);

        /*if(this.body.velocity.y > -(this.jumpSpeed + this.offsetY) || (this.body.velocity.y === 0 && this.body.onFloor())) {

           this.jumping = false;
           this.body.setVelocityX(0);
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

    Move(x, y) {
        if ((this.body.onFloor() || this.attached) && this.jumpsLeft > 0) {
            this.y -= 1;
            this.body.setAllowGravity(true);
            let movX = x - this.x;
            this.jumping = true;
            this.objy = y;
            this.body.setVelocityY((this.y - y) * this.jumpSpeed);
            this.body.setVelocityX(movX);
            this.flipX = (movX < 0);
            //this.jumpsLeft--;
        }
    }

    ResetVelocity(){
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
    }

    Jump(x, y){
        if(this.attached || this.body.onFloor()) {
            this.jumping = true;
            path = { t: 0, vec: new Phaser.Math.Vector2() };

            let startPoint = new Phaser.Math.Vector2(this.x, this.y);

            let dir = 1;
            if(x < this.x) dir = -1; //dir == izq

            let controlPoint1 = new Phaser.Math.Vector2(this.x + 30 * dir, y - 200);
            let controlPoint2 = new Phaser.Math.Vector2(this.x + 60 * dir, y - 400);
            let endPoint = new Phaser.Math.Vector2(x, y);

            curve = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);
            
            let player = this;
            this.scene.tweens.add({
                onComplete: function(){
                    player.jumping = false;
                    player.attached = true;
                    player.body.setAllowGravity(false);
                    player.ResetVelocity();
                },
                targets: path,
                t: 1,
                duration: 1000
            });
        }
    }
}
