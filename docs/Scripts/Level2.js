import LevelScene from './LevelScene.js';

export default class Level2 extends LevelScene {
    constructor() {
        super('./resources/maps/Level2.2json', 'Level2', 150, 2000, 9, './resources/maps/backgrounds/background2.png', 'Level3', 'tilemap2', 'background2');
    }
}