import Enemy from "../Enemy";

export default class SecurityCamera extends Enemy{
    constructor(scene, x, y, sprite, ninja){
        super(scene, x, y, sprite, ninja);
        this.body.immovable = true;
        this.body.moves = false;
        this.group.add();
    }
}