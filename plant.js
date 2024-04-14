class Plant {
    constructor(automata, row, col, hue) {
        this.row = row;
        this.col = col;
        this.automata = automata;
        this.hue = hue;

        this.age = 0;
    }

    update() {
        let plant_growth_speed = parseInt(document.getElementById('plant_growth_speed').max) + 1 - parseInt(document.getElementById('plant_growth_speed').value);

        if (++this.age % plant_growth_speed === 0) {
            this.try_reproduce();
        }
    }

    draw(ctx) {
        ctx.fillStyle = hsl(this.hue, 100, 75);
        ctx.fillRect(params.cell_inset + (params.cell_size + params.cell_inset) * this.col, params.cell_inset + (params.cell_size + params.cell_inset) * this.row, params.cell_size, params.cell_size);
    }

    try_reproduce() {
        let hue_range = document.getElementById('hue_mutation_range').value;

        let new_row = wrap(this.row + randomInt(3) - 1, params.grid_size);
        let new_col = wrap(this.col + randomInt(3) - 1, params.grid_size);

        if (this.automata.plant_grid[new_row][new_col] != null) return;

        let new_hue = wrap(this.hue + (Math.random() * 2 - 1) * hue_range, 360);

        this.automata.plant_grid[new_row][new_col] = new Plant(this.automata, new_row, new_col, new_hue);
    }
}