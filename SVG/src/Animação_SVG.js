let message = (text) => {
    let terminal = document.getElementById("terminal");
    terminal.innerText = text;
}

function new_context() {
    let svg_root = document
        .getElementById("SVG_Object").contentDocument;

    let context = {
        svg: svg_root,
    }
    context.render = render_context;
    context.render_svg = render_svg;

    return context;

}

function render_context(model) {
    switch(model.phase){
        case 0: message(`W - Up | S - Down | Press any to start`); break;
        case 1: message(`Points: ${model.points}`); break;
        case 2: message(`Game Over! You got ${model.points} points. Press R to restart`); break;
        default: break;
    }
       
    this.render_svg(model);
}

function render_svg(model) {
    model.ariete.svg.setAttribute(
        "transform", 
        `translate(0.06, ${model.ariete.pos_y})scale(0.15, 0.15)`);

    model.door[0].svg.setAttribute(
        "transform", 
        `translate(${model.door[0].pos_x}, ${model.door[0].pos_y})scale(1,${model.door[0].height * 10})`);

    model.door[1].svg.setAttribute(
        "transform", 
        `translate(${model.door[1].pos_x}, ${model.door[1].pos_y})scale(1,${model.door[1].height * 10})`);

    model.door[2].svg.setAttribute(
        "transform", 
        `translate(${model.door[2].pos_x}, ${model.door[2].pos_y})scale(1,${model.door[2].height * 10})`);
}

function points(model){

    const time = performance.now();
    const seconds = (time - model.time) / 1000;

    model.points = Math.floor(seconds);
}

function verify_door(model, a){
    
    model.door[a].vel = Math.max(model.door[a].vel, model.door[a].min_vel + 0.001);
    model.door[a].height = Math.min(model.door[a].max_height, Math.max(model.door[a].height, model.door[a].min_height + 0.001));
}

function spawn_door(model, a){

    model.door[a].pos_y = model.arena_min + Math.random() * (model.arena_max - model.door[a].height - model.arena_min);

}

function door_mov(model, a){

    model.door[a].pos_x -= model.door[a].vel * 0.01;
    if(model.door[a].pos_x <= model.arena_min_x) model.phase = 2;

    if (model.door[a].delay){
        if(model.door[0].pos_x <= model.door[a].delay){
            model.door[a].delay = 0;
            model.door[a].pos_x = model.door[0].pos_x0;
        }
    }

}

function ariete_mov(model){

    switch (model.ariete.action) {
        case 1: model.ariete.pos_y -= model.ariete.vel * 0.01; break;
        case 2: model.ariete.pos_y += model.ariete.vel * 0.01; break;
        default: break;
    };

    //barreiras horizontais
    model.ariete.pos_y = Math.max(
        model.arena_min,
        Math.min(model.arena_max - model.ariete.height, model.ariete.pos_y)); 

}

function colision(model, a){

    if (
        model.door[a].pos_x <= (model.ariete.pos_x + model.ariete.width)
        && (model.door[a].pos_x + model.door[a].width) >= model.ariete.pos_x
        && model.door[a].pos_y <= (model.ariete.pos_y + model.ariete.height)
        && (model.door[a].pos_y + model.door[a].height) >= model.ariete.pos_y
    ){ 
        model.door[a].pos_x = model.door[0].pos_x0;
        model.door[a].pos_y = model.door[a].pos_y0;
    };
}

function new_model(context) {

    let model = {
        arena_max: 0.948, //parede de baixo da arena
        arena_min: 0.052, //parede de cima da arena
        arena_min_x: 0.05, //parede esq da arena
        phase: 0,
        points: 0,
        time: performance.now(),
        ariete: {
            svg: context.svg.getElementById("ariete"),
            width: 0.15,   //comprimento do ariete
            height: 0.063, //altura do ariete
            pos_x0: 0.06,  
            pos_y0: 0.5,
            pos_x: 0.06,
            pos_y: 0.5, //posição inicial
            vel: 2,
            action: 0
        },
        door: [{
            svg: context.svg.getElementById("door1"),
            pos_x0: 0.92,  
            pos_x: 0.92,
            pos_y0: -1,
            pos_y: -1,
            vel: 0.5,
            width: 0.025,
            height: 0.1,
            min_vel: 0.1,
            min_height: 0.1,
            max_height: 0.85,
            delay: 0
        },
        {
            svg: context.svg.getElementById("door2"),
            pos_x0: 10,   //fora da arena até spawnar quando chegar à medida = delay
            pos_x: 10,
            pos_y0: -1,
            pos_y: -1,
            vel: 0.5,
            width: 0.025,
            height: 0.1,
            min_vel: 0.1,
            min_height: 0.1,
            max_height: 0.85,
            delay: 0.71,
            delay0: 0.71
        },
        {
            svg: context.svg.getElementById("door3"),
            pos_x0: 10,  //fora da arena até spawnar quando chegar à medida = delay
            pos_x: 10,
            pos_y0: -1,
            pos_y: -1,
            vel: 0.5,
            width: 0.025,
            height: 0.1,
            min_vel: 0.1,
            min_height: 0.1,
            max_height: 0.85,
            delay: 0.50,
            delay0: 0.50
        }]
    };

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "w": case "W": model.ariete.action = 1; break;
            case "s": case "S": model.ariete.action = 2; break;
            case "r": case "R": model.ariete.action = 3; break; //reset
            default: model.ariete.action = 0; break;
        }
    });

    document.addEventListener("keyup", (e) => {
        switch (e.key) {
            case "w": case "W": model.ariete.action = 0; break;
            case "s": case "S": model.ariete.action = 0; break;
            case "r": case "R": model.ariete.action = 0; break;
            default: break;
        }
    });

    model.update = update_model;

    return model;
}

function update_model() {

    switch(this.phase){
        case 0:

            if (this.ariete.action === 1 || this.ariete.action === 2) this.phase = 1; break;

        case 1:

            points(this);
            ariete_mov(this);
            for (let i = 0; i < this.door.length; i++){
                
                verify_door(this, i);
                if (this.door[i].pos_x === this.door[0].pos_x0) spawn_door(this, i);
                door_mov(this, i);
                colision(this, i);
            }

            break;

        case 2: 
        
            if(this.ariete.action === 3){ 

                this.phase = 0;
                
                this.ariete.pos_x = this.ariete.pos_x0;
                this.ariete.pos_y = this.ariete.pos_y0;
                this.time = performance.now();

                for (let i = 0; i < this.door.length; i++){
                    this.door[i].pos_x = this.door[i].pos_x0;
                    this.door[i].pos_y = this.door[i].pos_y0;
                    this.door[i].delay = this.door[i].delay0;
                }
            }

            break;

        default: this.phase = 0; break;
    }        
}

function start_animation() { 

    console.log("Starting Animation...");

    let gc = new_context();
    let model = new_model(gc);

    let step = (ts) => {
        model.update();
        gc.render(model);
        requestAnimationFrame(step);
    }

    step();
}

function main() {
    let SVG_LOADED = false;       

    message(`I'm alive...`);

    document
        .getElementById("SVG_Object")
        .addEventListener("load", () =>  SVG_LOADED = true);

    let wait_load = function() {
        if (SVG_LOADED) {
            start_animation();
        } else {
            requestAnimationFrame(wait_load);
        }
    } 
    wait_load();
}