export default class Player extends Phaser.GameObjects.Sprite{

    constructor(scene, x,y, sprite, nJumps){
        super(scene, x, y, sprite);
        this.setSize(50,120);
        this.setDisplaySize(150,150);
        
        //Físicas
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        scene.add.existing(this);
        this.body.setOffset(100, 0);

        //Atributos
        this.ableToMove = true;
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
        //this.isSeen = false;
        this.scene = scene;
        this.runAnimation = true;
    }

    preUpdate(t,d) {
        if(this.ableToMove){
            super.preUpdate(t,d);
            if(this.jumping){
                this.curve.getPoint(this.path.t, this.path.vec);
                this.x = this.path.vec.x;
                this.y = this.path.vec.y;
            }

            else if (this.body.velocity.y < 5 && this.body.onFloor())
            {
                this.agarre = null;
                let objX = this.mouse.worldX;
                if(this.mouse.rightButtonDown())
                    {
                    if (objX-this.x > this.offsetX) {
                        this.RestartRunningAnimation();
                        this.body.setVelocityX(this.speed);
                        this.flipX = false;
                    }

                    else if (objX-this.x < - this.offsetX) {
                        this.RestartRunningAnimation();
                        this.body.setVelocityX(-this.speed);
                        this.flipX = true;
                    }
                }
                else {
                    this.anims.stop();
                    this.play('idle');
                    this.body.setVelocityX(0);
                    this.runAnimation = true;
                }
            }
            else if(this.attached){
                this.play('bended'); //this.play('attachedAnim');
                if(this.mouse.rightButtonDown()){
                    this.attached = false;
                    this.agarre = null;
                    this.body.setAllowGravity(true);
                }
            }
            else {
                if (this.body.velocity.y > 5 && !this.body.onFloor())
                    this.play('NinjaFall');
                    
                else if(this.body.velocity.x != 0 && this.body.onFloor() && this.runAnimation) {
                    this.play('run');
                    this.RestartRunningAnimation();
                }
            }

            this.mouse.updateWorldPoint(this.camera);

            if (this.brillando) this.curve.draw(this.scene.graphics);
        }
        else
        {
            this.body.setVelocity(0);
            this.body.setEnable(false);
        }
    }

    Hide() {
        this.sprite.setAlpha(0);
    }

    ResetVelocity(){
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
        this.anims.pause();
    }

    isSeen(escena) {
        this.ableToMove = false;
        escena.playSeenMusic();
    }
    
    Jump(agarre, x, y){
        if(this.agarre !== agarre)
        {
            this.agarre = agarre;
            if(this.jumpsLeft !== 0 && !this.jumping && (this.attached || this.body.onFloor()))
            {
                this.jumping = true;
                this.play('NinjaJump');
                this.scene.playJumpMusic();
                this.jumpsLeft--;
                this.scene.actualizeJumpsText(this.jumpsLeft);

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
                        player.play('run');
                        player.anims.stop();
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
        this.scene.graphics.lineStyle(20, "0XE8518B", 1.0);
        this.scene.graphics.alpha = 0.25;
        this.brillando = false;
    }
    
    RestartRunningAnimation(){
        if(this.runAnimation){
            this.play('run');
            this.runAnimation = false;
        }
    }
}