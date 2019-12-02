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
        this.curve; this.createPath(0, 0);;
        this.path;
        this.brillando = false;
        this.agarre = null;
        this.isSeen = false;
    }

    preUpdate() {

        if(this.jumping){
            this.curve.getPoint(this.path.t, this.path.vec);
            this.x = this.path.vec.x;
            this.y = this.path.vec.y;
        }

        else if (this.body.onFloor())
        {
            this.agarre = null;
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
            this.agarre = null;
            this.body.setAllowGravity(true);
        }

        this.mouse.updateWorldPoint(this.camera);

        if(this.brillando)
            this.curve.draw(this.scene.graphics);

        if(this.isSeen){
            console.log("Has perdido bitch");
        }
    }

    Hide() {
        this.sprite.setAlpha(0);
    }

    ResetVelocity(){
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
    }

    isSeen() {
        
    }
    
    Jump(agarre){
        if(this.agarre !== agarre)
        {
            let x = agarre.x;
            let y = agarre.y;
            this.agarre = agarre;
            if(this.jumpsLeft !== 0 && !this.jumping && (this.attached || this.body.onFloor()))
            {
                this.jumping = true;
                this.jumpsLeft--;

                this.flipX = (x < this.x);
                
                this.LimpiarBrillitos();
                this.createPath(x, y);

                let tiempo = Math.sqrt(Math.pow((this.x -x), 2) + Math.pow((this.y-y), 2));

                let player = this;
                this.scene.tweens.add({
                    onComplete: function(){
                        player.jumping = false;
                        player.attached = true;
                        player.body.setAllowGravity(false);
                        player.ResetVelocity();
                    },
                    targets: this.path,
                    t: 1,
                    duration: tiempo * 1
                });
            }
        }
    }

    createPath(x, y){
        this.path = { t: 0, vec: new Phaser.Math.Vector2() };
        let startPoint = new Phaser.Math.Vector2(this.x, this.y); 
        let controlPoint1 = new Phaser.Math.Vector2(this.x + (x - this.x) * 0.5, y - Math.abs(y - this.y));
        let controlPoint2 = new Phaser.Math.Vector2(this.x + (x - this.x) * 0.8, y - Math.abs(y - this.y));
        let endPoint = new Phaser.Math.Vector2(x, y);

        this.curve = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);
    }

    HacerQueBrille(x, y) {
        this.LimpiarBrillitos();
        if(this.jumpsLeft !== 0 && !this.jumping && (this.attached || this.body.onFloor())) {
            this.createPath(x, y);
            this.brillando = true;
        }
    }

    LimpiarBrillitos() {
        this.scene.graphics.clear();
        this.scene.graphics.lineStyle(50, "0xFF00FF", 1.0);
        this.scene.graphics.fillStyle("0xFFFFFF", 1.0);
        this.brillando = false;
    }
}