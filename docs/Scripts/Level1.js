
import LevelScene from './LevelScene.js';

export default class Level1 extends LevelScene {

    constructor() {
        super('./resources/maps/Level1.2.json', 'main', 150, 900, 3);
    }
    
}
