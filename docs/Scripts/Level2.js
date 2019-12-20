import LevelScene from './LevelScene.js';

export default class Level2 extends LevelScene {
    constructor() {
        super( 'Level2', 150, 2000, 8, 'Level3', 'tilemap2', 'background2');
    }
}