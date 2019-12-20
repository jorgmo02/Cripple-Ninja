import LevelScene from './LevelScene.js';

export default class Level2 extends LevelScene {
    constructor() {
        super('./resources/maps/Level3.json', 'Level3', 150, 800, 15, './resources/maps/backgrounds/background4.png', 'YouWin', 'tilemap3', 'background3');
    }
}