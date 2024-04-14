const gameEngine = new GameEngine();

const automata = new Automata();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.addEntity(automata);

	gameEngine.start();

	
});

const add_animat = () => {
	let row = randomInt(params.grid_size);
	let col = randomInt(params.grid_size);
	let hue = randomInt(360)

	gameEngine.addEntity(new Animat(gameEngine, automata, row, col, hue));
}

const reset_sim = () => {
	automata.clear()
	gameEngine.entities = [];
	gameEngine.addEntity(automata);
	gameEngine.draw();
}
