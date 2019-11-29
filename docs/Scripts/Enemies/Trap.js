import StaticEnemy from "./StaticEnemy.js"

export default class SecurityCamera extends StaticEnemy{
    constructor(scene, x, y, sprite, ninja){
        super(scene, x, y, sprite, ninja);
        this.body.immovable = true;
        this.body.moves = false;
        this.group.add();
    }
}