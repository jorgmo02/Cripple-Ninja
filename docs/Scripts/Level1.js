import LevelScene from './LevelScene.js';

export default class Level1 extends LevelScene {
    constructor() {
        super( 'Level1', 150, 900, 3, 'Level2', 'tilemap', 'background1');
    }
    
}