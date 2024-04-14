class Automata {
    constructor() {
        this.plant_grid = [];
        for (let i = 0; i < params.grid_size; i++) {
            let row = [];
            for (let j = 0; j < params.grid_size; j++) {
                row.push(null);
            }
            this.plant_grid.push(row);
        }
    }

    update() {
        for (let i = 0; i < params.grid_size; i++) {
            for (let j = 0; j < params.grid_size; j++) {
                if (Math.random() < 0.001) this.plant_grid[i][j] = null;
                this.plant_grid[i][j]?.update()
            }
        }
    }

    draw(ctx, gameengine) {
        for (let i = 0; i < params.grid_size; i++) {
            for (let j = 0; j < params.grid_size; j++) {
                this.plant_grid[i][j]?.draw(ctx)
            }
        }
    }

    add_plant() {
        let new_row = randomInt(params.grid_size);
        let new_col = randomInt(params.grid_size);

        if (this.plant_grid[new_row][new_col] != null) return;

        let new_hue = randomInt(360);

        this.plant_grid[new_row][new_col] = new Plant(this, new_row, new_col, new_hue);
    }

    clear() {
        for (let i = 0; i < params.grid_size; i++) {
            for (let j = 0; j < params.grid_size; j++) {
                this.plant_grid[i][j] = null;
            }
        }
    }
}