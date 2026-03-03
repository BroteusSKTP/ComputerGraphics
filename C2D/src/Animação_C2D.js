function draw_grass(model) {

    this.fillStyle = model.grass.color; //desenho da relva
    this.fillRect(0, 0, this.width, this.height);
}

function draw_road(model) {

    this.fillStyle = model.road.color; //desenho das estradas
    for (let i = 0; i < model.road.xi.length; i++){ //desenhar o numero de estradas pertendidos
        this.fillRect(model.road.xi[i], 0, model.road.width, this.height)
    };
}

function draw_lines(model) {

    const n_lines = Math.floor(this.height / (model.line.height + model.line.space)); //numero de linhas por estrada
    const move_dist = (model.age * model.line.vel) % (model.line.height + model.line.space);

    this.fillStyle = model.line.color; //por cada estrada desenhar um traço descontinuo.
    for (let i = 0; i < model.road.xi.length; i++) { 
        for (let j = 0; j < n_lines; j++){ 
            let pos_line = j * (model.line.height + model.line.space); //determina a posição da linha atual
            model.line.y = this.height - move_dist - pos_line; //determina o y consoante o movimento

            this.fillRect(
                model.road.xi[i] + (model.road.width / 2) - 1, 
                model.line.y,
                2,
                -model.line.height
            );
        };
    }
}

function draw_trees(model) {

    const move_dist = (model.age * model.tree.vel) % model.tree.space;
    const trunk = model.tree.children.trunk;
    const branches = model.tree.children.branches;

    for (let i = 0; i < model.tree.xi.length; i++){
        for (let j = 0; j < model.tree.yi.length; j++){

            let y = this.height - (j * model.tree.space) - move_dist;
            if (y < -trunk.height) { //reaparecer no fundo
                y += model.tree.yi.length * model.tree.space;
            }
            
            this.fillStyle = trunk.color; //Troncos
            this.fillRect(
                model.tree.xi[i],
                y,
                trunk.width,
                trunk.height
            )

            this.fillStyle = branches.color; //Ramos
            this.beginPath();
            this.arc(
                model.tree.xi[i] + (trunk.width / 2),
                y - (branches.radius),
                branches.radius,
                0,
                Math.PI * 2
            );
            this.fill();
        }
    }
}

function draw_car(model) {
    
    const car = model.car;
    this.fillStyle = model.car.color;
    this.fillRect(
        car.x - (car.width / 2),
        car.y - (car.height) / 2,
        car.width,
        car.height
    );

    draw_mirrors.call(this, car);
    draw_lights.call(this, car);
    draw_wheels.call(this, car);
    draw_front_w.call(this, car);
    draw_back.call(this, car);
}

function draw_mirrors(car) {

    const mirrors = [];
    for (let i = 0; i < 2; i++){

        mirrors.push(car.children.mirror);

        switch(i){
            case 0: if(mirrors[i].dist_cx > 0) mirrors[i].dist_cx *= -1; break;
            case 1: mirrors[i].dist_cx *= -1; break; 
        }

        this.fillStyle = mirrors[i].color;
        this.beginPath()
        this.arc(
            car.x + mirrors[i].dist_cx,
            car.y + mirrors[i].dist_cy,
            mirrors[i].radius,
            0,
            2 * Math.PI
        );
        this.fill();
    }
}

function draw_lights(car) {

    const lights = [];
    for (let i = 0; i < 2; i++){

        lights.push(car.children.lights);

        switch(i){
            case 0: if(lights[i].dist_cx > 0) lights[i].dist_cx *= -1; break;
            case 1: lights[i].dist_cx *= -1; break; 
        }

        this.fillStyle = lights[0].color;
        this.beginPath()
        this.arc(
            car.x + lights[i].dist_cx,
            car.y + lights[i].dist_cy,
            lights[i].radius,
            0,
            2 * Math.PI
        );
        this.fill();
    }
}

function draw_wheels(car) {

    const wheels = [];
    for (let i = 0; i < 4; i++){

        wheels.push(car.children.wheels);

        switch(i){
            case 0: 
                if(wheels[i].dist_cx > 0) wheels[i].dist_cx *= -1; 
                if(wheels[i].dist_cy > 0) wheels[i].dist_cy *= -1; 
                break;
            case 1: wheels[i].dist_cx *= -1; break;
            case 2: wheels[i].dist_cy *= -1; break;
            case 3: wheels[i].dist_cx *= -1; break;
        }

        this.fillStyle = wheels[i].color;
        this.fillRect(
            car.x + wheels[i].dist_cx - (wheels[i].width / 2),
            car.y + wheels[i].dist_cy - (wheels[i].height / 2),
            wheels[i].width,
            wheels[i].height
        )
    }
}

function draw_front_w(car) {

    const front_w = car.children.front_w;
    this.fillStyle = front_w.color;
    this.fillRect(
        car.x - (front_w.width / 2),
        car.y + front_w.dist_cy + (front_w.height / 2),
        front_w.width,
        front_w.height
    );
}

function draw_back(car) { 
    const back = car.children.back;
    this.strokeStyle = back.color;
    this.strokeRect(
        car.x - (back.width / 2),
        car.y + back.dist_cy + (back.height / 2),
        back.width,
        back.height
    );
}

function draw_ovni(model) {

    const ovni = model.ovni;

    this.fillStyle = ovni.color;
    this.beginPath();
    this.arc(
        ovni.x,
        ovni.y,
        ovni.radius,
        0,
        2 * Math.PI
    );
    this.fill();

    draw_top.call(this, ovni);
    draw_win.call(this, ovni);
}

function draw_top(ovni) {

    const top = ovni.top;

    this.fillStyle = top.color;
    this.beginPath();
    this.arc(
        ovni.x,
        ovni.y,
        top.radius,
        0,
        2 * Math.PI
    );
    this.fill();
}

function draw_win(ovni) {

    const win = [];
    let a = (2 * Math.PI) / 6;

    for (let i = 0; i < 6; i++){

        win.push(ovni.win);

        win[i].x = Math.cos(a * (i + 1)) * win[i].dist + ovni.x;
        win[i].y = Math.sin(a * (i + 1)) * win[i].dist + ovni.y;

        this.fillStyle = win[i].color;
        this.beginPath();
        this.arc(
            win[i].x,
            win[i].y,
            win[i].radius,
            0,
            2 * Math.PI
        );
        this.fill();
    }
}

function road_calc(number, c_width) {
    const divide = c_width / (number + 1);
    const st = []; //array com os x's iniciais de cada estrada

    for (let i = 1; i <= number; i++) {
        st.push(divide * i - 50); //roads tem 100 de largura por isso depois de calculado os x centrais, subtrai - se metade da largura
    }
    
    return st;
}

function tree_calc(number, c_height) {
    const divide = c_height / (number + 1);
    const st = [];
    for (let i = 1; i <= number; i++){
        st.push(divide * i);
    }

    return st;
}

function new_model() {
    const model = {
        age: 0,
        grass: {
            color: "Chartreuse",
        },
        road: {
            color: "Gray",
            width: 120,
            xi: road_calc(2, 512)
        },
        line: {
            color: "White",
            height: 6,
            space: 2,
            y: 0,
            vel: 2
        },
        tree: {
            space: 100,
            vel: 2,
            xi: [35, 477], //berma esquerda e direita
            yi: tree_calc(6, 512),
            children: {
                trunk: {
                    color: "Brown",
                    height: 20,
                    width: 6
                }, 
                branches: {
                    color: "Green",
                    radius: 15
                }
            }
        },
        car: {
            color: "crimson",
            width: 30,
            height: 45,
            x: 256,
            y: 0,
            handling: 0,
            vel_x: 3,
            vel_y: 0.8, 
            children: {
                wheels: {
                    color: "black",
                    width: 3,
                    height: 7,
                    dist_cx: 14,
                    dist_cy: 15
                },
                mirror: {
                    color: "DarkRed",
                    radius: 2,
                    dist_cx: 13,
                    dist_cy: 2
                },
                front_w: {
                    color: "Aquamarine",
                    width: 20,
                    height : 10,
                    dist_cy: -5
                },
                lights: {
                    color: "khaki",
                    radius: 3,
                    dist_cx: 9,
                    dist_cy: 20
                },
                back: {
                    color: "DarkRed",
                    width: 20,
                    height : 15,
                    dist_cy: -27
                }
            }
        },
        ovni: {
            color: "Coral",
            x: 256,
            y: -37,
            radius: 37,
            vel: 0.5,
            delay: 0.1,
            dist: 120,
            top: {
                color: "Azure",
                radius: 22,
            },
            win: {
                color: "DarkMagenta",
                x: 0,
                y: 0,
                dist: 29.5,
                radius: 4
            }
        }
    }
    return model;
};

function render_escape(model) {

    this.draw_grass(model);
    this.draw_road(model);
    this.draw_lines(model);
    this.draw_trees(model);
    this.draw_car(model);
    this.draw_ovni(model);

}

function update(model) {
    
    model.age += 1; //age update

    //car random movement
    if (model.age % 50 === 0) {
        model.car.handling = Math.random() < 0.5 ? -1 : 1;
    };

    model.car.x += (model.car.handling * model.car.vel_x);
    model.car.y += model.car.vel_y;

    //impedir que bata nas árvores
    const l_barrier = 75; //left barrier
    const r_barrier = 440; //right barrier
    model.car.x = Math.max(l_barrier, Math.min(model.car.x, r_barrier));

    //ovni follower
    let dx = model.ovni.vel * (model.car.x - model.ovni.x);
    let dy = model.ovni.vel * (model.car.y - model.ovni.y);

    model.ovni.x += dx * model.ovni.delay;
    model.ovni.y += dy * model.ovni.delay;

    //impedir que ovni alcance o carro
    model.ovni.y = Math.max(-model.ovni.radius, Math.min(model.ovni.y, model.car.y - model.ovni.dist));


    //reset posição de ovni e carro
    if ((model.ovni.y - model.ovni.radius) >= 512){
        model.car.y = 0;
        model.ovni.y = -model.ovni.radius;
    }

    return model;
}

function new_context(canvas, width, height) {
    const gc = document
        .getElementById(canvas)
        .getContext("2d");
    gc.canvas.width = width || 256;
    gc.canvas.height = height || 256;
    gc.height = gc.canvas.height;
    gc.width = gc.canvas.width;
    gc.render = render_escape;
    gc.draw_grass = draw_grass;
    gc.draw_road = draw_road;
    gc.draw_lines = draw_lines;
    gc.draw_trees = draw_trees;
    gc.draw_car = draw_car;
    gc.draw_ovni = draw_ovni;
    const terminal = document.getElementById("terminal");
    gc.message = (text) => terminal.innerHTML = text;

    return gc;
}

function main() {
    const gc = new_context("acanvas", 512, 512);
    let model = new_model();
    const step = () => {
        update(model);
        gc.render(model);
        gc.message(`AGE: ${model.age}`); 
        requestAnimationFrame(step);
    };
    step();
}