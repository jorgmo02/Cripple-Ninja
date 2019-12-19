import LevelScene from './LevelScene.js';

export default class Level1 extends LevelScene {
    constructor() {
        super('./resources/maps/Level1.json', 'Level1', 150, 900, 3, './resources/maps/backgrounds/background1.png', 'Level2', 'tilemap', 'background1');
    }
    
}