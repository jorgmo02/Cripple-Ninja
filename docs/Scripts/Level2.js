import LevelScene from './LevelScene.js';

export default class Level2 extends LevelScene {

    constructor() {
        super('./resources/maps/Level2.json', 'Level2', 150, 2000, 3, './resources/maps/backgrounds/background2.png', 'mainMenu');
    }
    
}