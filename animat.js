class Animat {
    constructor(gameengine, automata, row, col, hue) {
        this.gameengine = gameengine;
        this.automata = automata;
        this.row = row;
        this.col = col;
        this.hue = hue;

        this.energy = params.animat_base_energy;

        this.removeFromWorld = false;
    }

    update() {
        //Kill
        this.energy -= params.animat_energy_consumption_per_step;
        if (this.energy < 0 || Math.random() <= 0.001) {
            this.removeFromWorld = true;
        }

        //Move
        let champ_plant = null;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;

                let y = wrap(this.row + i, params.grid_size);
                let x = wrap(this.col + j, params.grid_size);

                let curr_plant = this.automata.plant_grid[y][x];

                if (curr_plant === null) continue;

                if (champ_plant === null) {
                    champ_plant = curr_plant;
                    continue;
                }

                if (wrapped_difference(this.hue, champ_plant.hue, 360) > wrapped_difference(this.hue, curr_plant.hue, 360)) {
                    champ_plant = curr_plant;
                }
            }
        }
        
        if (champ_plant === null && document.getElementById('walking_animat').checked) {
            this.row = wrap(this.row + randomInt(3) - 1, params.grid_size);
            this.col = wrap(this.col + randomInt(3) - 1, params.grid_size);
        }

        else if (champ_plant !== null){
            this.row = champ_plant.row;
            this.col = champ_plant.col;
        }

        //Eat
        if (champ_plant !== null) {
            let diet_range = parseInt(document.getElementById('animat_diet_range').value);
            if (wrapped_difference(this.hue, champ_plant.hue, 360) <= diet_range) {
                this.automata.plant_grid[this.row][this.col] = null;
                this.energy += params.plant_nutrition_value;
            }
        }

        //Adapt
        if (document.getElementById('adaptive_animat').checked && this.automata.plant_grid[this.row][this.col] !== null) {
            //push the hue towards the hue of the plant it is standing on

            let plant_hue = this.automata.plant_grid[this.row][this.col].hue;
            let abs_diff = wrapped_difference(this.hue, plant_hue, 360)

            let diff = plant_hue - this.hue;

            if (abs_diff != diff) {
                diff *= -1;
            }

            diff /= Math.abs(diff);

            this.hue = this.hue + (diff * params.animat_adaptation_constant);
        } 
        
        //Reproduce
        if (this.energy >= params.animat_base_energy * params.animat_reproduction_multiplier) {
            this.reproduce();
        }
    }

    draw(ctx, gameengine) {

        ctx.fillRect(params.cell_inset + (params.cell_size + params.cell_inset) * this.col, params.cell_inset + (params.cell_size + params.cell_inset) * this.row, params.cell_size, params.cell_size);
    

        ctx.beginPath();
        ctx.arc(
            params.cell_inset + (params.cell_size + params.cell_inset) * this.col + (params.cell_size / 2), 
            params.cell_inset + (params.cell_size + params.cell_inset) * this.row + (params.cell_size / 2), 
            params.cell_size / 2, 
            0, 
            2 * Math.PI, 
            false
        );
        ctx.fillStyle = hsl(this.hue, 100, 75);
        ctx.fill();

        // Draw the black border
        ctx.lineWidth = params.cell_inset;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    reproduce() {
        let hue_range = parseInt(document.getElementById('hue_mutation_range').value);

        let new_row = wrap(this.row + randomInt(3) - 1, params.grid_size);
        let new_col = wrap(this.col + randomInt(3) - 1, params.grid_size);
        let new_hue = wrap(this.hue + (Math.random() * 2 - 1) * hue_range, 360);

        this.gameengine.addEntity(new Animat(this.gameengine, this.automata, new_row, new_col, new_hue));

        this.energy - params.animat_base_energy;
    }
}