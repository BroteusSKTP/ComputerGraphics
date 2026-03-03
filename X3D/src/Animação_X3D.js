let message = (text) => {
    let terminal = document.getElementById("terminal");
    terminal.innerText = text;
}


function new_context() {
    let x3d_root = document
        .getElementById("X3D__picture");

    let context = {
        x3d: x3d_root,
    }
    context.render = render_context;
    context.render_x3d = render_x3d;

    return context;

}

function render_context(model) {

    this.render_x3d(model);

}

function render_x3d(model) {

    model.grade.x3d.setAttribute(
        "translation",
        `0 1 ${model.grade.pos}`);

    model.janela.x3d.setAttribute(
        "translation",
        `-0.05 0 ${model.janela.pos}`);

    model.parede_t.x3d.setAttribute(
        "translation",
        `0 0 ${model.parede_t.pos}`);

    model.parede_d.x3d.setAttribute(
        "translation",
        `0.45 0 ${model.parede_d.pos}`);

    model.parede_e.x3d.setAttribute(
        "translation",
        `-0.45 0 ${model.parede_e.pos}`);

    model.parede_f.x3d.setAttribute(
        "translation",
        `-0.5 -0.5 ${model.parede_f.pos}`);

    model.door.x3d.setAttribute(
        "translation",
        `-0.2 -0.075 ${model.door.pos}`);

    model.telha_e.x3d.setAttribute(
        "translation",
        `-0.5 0.5 ${model.telha_e.pos}`);

    model.telha_d.x3d.setAttribute(
        "translation",
        `0.5 0.5 ${model.telha_d.pos}`);

    model.telha_f.x3d.setAttribute(
        "translation",
        `0 0.5 ${model.telha_f.pos}`);

    model.telha_t.x3d.setAttribute(
        "translation",
        `0 0.5 ${model.telha_t.pos}`);

    model.chamine.x3d.setAttribute(
        "translation",
        `-0.3 0.67 ${model.chamine.pos}`);

    model.madeiro.x3d.setAttribute(
        "translation",
        `-0.2 -0.17 ${model.madeiro.pos}`);

    model.sol.x3d.setAttribute(
        "rotation",
        `0 0 1 ${-model.sol.angle}`);    
}


function new_model(context) {
    let model = {
        age: 0,
        phase: 0,
        timer: 0,
        janela: {
            x3d: document.getElementById("X3D__janela"),
            pos: 12,
            vel: 0.001
        },
        grade: {
            x3d: document.getElementById("X3D__grade"),
            pos: 10,
            vel: 0.001
        },
        parede_t: {
            x3d: document.getElementById("X3D__parede_t"),
            pos: 10,
            vel: 0.001
        },
        parede_d: {
            x3d: document.getElementById("X3D__parede_d"),
            pos: 13,
            vel: 0.001
        },
        parede_e: {
            x3d: document.getElementById("X3D__parede_e"),
            pos: 16,
            vel: 0.001
        },
        parede_f: {
            x3d: document.getElementById("X3D__parede_f"),
            pos: 19,
            vel: 0.001
        },
        door: {
            x3d: document.getElementById("X3D__door"),
            pos: 10,
            vel: 0.001
        },
        telha_e: {
            x3d: document.getElementById("X3D__telha_e"),
            pos: 13,
            vel: 0.001
        },
        telha_d: {
            x3d: document.getElementById("X3D__telha_d"),
            pos: 16,
            vel: 0.001
        },
        telha_f: {
            x3d: document.getElementById("X3D__telha_f"),
            pos: 22,
            vel: 0.001
        },
        telha_t: {
            x3d: document.getElementById("X3D__telha_t"),
            pos: 19,
            vel: 0.001
        },
        chamine: {
            x3d: document.getElementById("X3D__chamine"),
            pos: 10,
            vel: 0.001
        },
        madeiro: {
            x3d: document.getElementById("X3D__madeiro"),
            pos: 13,
            vel: 0.001
        },
        sol: {
            x3d: document.getElementById("X3D__sol"),
            angle: 0,
        },
    };
    
    model.update = update_model;

    return model;
}

function update_model() {
    this.age += 1;
    this.timer += 1;

    switch(this.phase){
        case 0:

            this.janela.pos = this.janela.pos - this.timer * this.janela.vel;
            this.janela.pos = Math.max(this.janela.pos, 0.225);

            this.grade.pos = this.grade.pos - this.timer * this.grade.vel;
            this.grade.pos = Math.max(this.grade.pos, -0.1);

            if (this.janela.pos === 0.225 && this.grade.pos === -0.1){
                this.phase = 1;
                this.timer = 0;
            };

            break;

        case 1:

            this.parede_t.pos = this.parede_t.pos - this.timer * this.parede_t.vel;
            this.parede_t.pos = Math.max(this.parede_t.pos, -0.7);

            this.parede_d.pos = this.parede_d.pos - this.timer * this.parede_d.vel;
            this.parede_d.pos = Math.max(this.parede_d.pos, -0.25);

            this.parede_e.pos = this.parede_e.pos - this.timer * this.parede_e.vel;
            this.parede_e.pos = Math.max(this.parede_e.pos, -0.25);

            this.parede_f.pos = this.parede_f.pos - this.timer * this.parede_f.vel;
            this.parede_f.pos = Math.max(this.parede_f.pos, 0.3);

            if (
                this.parede_t.pos === -0.7
                && this.parede_d.pos === -0.25
                && this.parede_e.pos === -0.25
                && this.parede_f.pos === 0.3
            ){
                this.phase = 2;
                this.timer = 0;
            };

            break;

        case 2:

            this.door.pos = this.door.pos - this.timer * this.door.vel;
            this.door.pos = Math.max(this.door.pos, 0.25);

            this.telha_e.pos = this.telha_e.pos - this.timer * this.telha_e.vel;
            this.telha_e.pos = Math.max(this.telha_e.pos, -0.225);

            this.telha_d.pos = this.telha_d.pos - this.timer * this.telha_d.vel;
            this.telha_d.pos = Math.max(this.telha_d.pos, -0.225);

            this.telha_f.pos = this.telha_f.pos - this.timer * this.telha_f.vel;
            this.telha_f.pos = Math.max(this.telha_f.pos, 0.3);

            this.telha_t.pos = this.telha_t.pos - this.timer * this.telha_t.vel;
            this.telha_t.pos = Math.max(this.telha_t.pos, -0.75);

            if(
                this.door.pos === 0.25
                && this.telha_e.pos === -0.225
                && this.telha_d.pos === -0.225
                && this.telha_f.pos === 0.3
                && this.telha_t.pos === -0.75
            ){
                this.phase = 3;
                this.timer = 0;
            }

            break;

        case 3:

            this.chamine.pos = this.chamine.pos - this.timer * this.chamine.vel;
            this.chamine.pos = Math.max(this.chamine.pos, -0.125);

            this.madeiro.pos = this.madeiro.pos - this.timer * this.madeiro.vel;
            this.madeiro.pos = Math.max(this.madeiro.pos, 0.47);

            if(
                this.chamine.pos === -0.125
                && this.madeiro.pos === 0.47
            ){
                this.phase = 4;
                this.timer = 0;
            }

            break;

        case 4:

            this.sol.angle += 2.0 * Math.PI / 360; break;

        default: break;
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
    let X3D_LOADED = false; 

    document
        .getElementById("X3D_Object").onload = (ev) =>  {
            X3D_LOADED = true;
        };

    let wait_load = function() {
        if (X3D_LOADED) {
            start_animation();
        } else {
            requestAnimationFrame(wait_load);
        }
    } 
    wait_load();
}