const extrude = {
	steps: 1,
	depth: 2,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 1,
	bevelOffset: -1,
	bevelSegments: 0
};

function model() {

    let Letter_e = letter_e();
    Letter_e.scale.set(10, 10, 1);
    Letter_e.position.set(-250, 50, 0);
    let position_e = new THREE.Vector3(0, 0, 0);
    animateLetter(Letter_e, position_e);

    let Letter_n = letter_n();
    Letter_n.scale.set(34, 34, 1);
    Letter_n.position.set(260, 50, 0);
    let position_n = new THREE.Vector3(-0.2, -0.2, 0);
    animateLetter(Letter_n, position_n);

    let Letter_f = letter_f();
    Letter_f.scale.set(34, 34, 1);
    Letter_f.position.set(-270, 50, 0);
    let position_f = new THREE.Vector3(0.2, -0.2, 0);
    animateLetter(Letter_f, position_f);

    let Letter_e2 = letter_e();
    Letter_e2.scale.set(10, 10, 1);
    Letter_e2.position.set(280, 50, 0);
    let position_e2 = new THREE.Vector3(17, 0, 0);
    animateLetter(Letter_e2, position_e2);

    let Letter_i = letter_i();
    Letter_i.scale.set(34, 34, 1);
    Letter_i.position.set(-290, 50, 0);
    let position_i = new THREE.Vector3(4, -0.2, 0);
    animateLetter(Letter_i, position_i);

    let Letter_t = letter_t();
    Letter_t.scale.set(34, 34, 1);
    Letter_t.position.set(300, 50, 0);
    let position_t = new THREE.Vector3(3, -0.2, 0);
    animateLetter(Letter_t, position_t);

    let Letter_i2 = letter_i();
    Letter_i2.scale.set(34, 34, 1);
    Letter_i2.position.set(-310, 50, 0);
    let position_i2 = new THREE.Vector3(11, -0.2, 0);
    animateLetter(Letter_i2, position_i2);

    let Letter_ce = letter_ce();
    Letter_ce.scale.set(34, 34, 1);
    Letter_ce.position.set(320, 50, 0);
    let position_ce = new THREE.Vector3(6.4, -0.2, 0);
    animateLetter(Letter_ce, position_ce);

    let Letter_o = letter_o();
    Letter_o.scale.set(34, 34, 1);
    Letter_o.position.set(-330, 50, 0);
    let position_o = new THREE.Vector3(6.4, -0.2, 0);
    animateLetter(Letter_o, position_o);

    let word = new THREE.Object3D();
    word.add(Letter_e);
    word.add(Letter_n);
    word.add(Letter_f);
    word.add(Letter_e2);
    word.add(Letter_i);
    word.add(Letter_t);
    word.add(Letter_i2);
    word.add(Letter_ce);
    word.add(Letter_o);

    word.scale.set(1, 1, 1);
    word.position.set(-20, 0, 0);

    return word;
}

function start(model){

    //renderer
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //camera
    let camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight, 
        0.1, 
        10000 
    );

    camera.position.set( 0, 0, 300 );
    camera.lookAt( 0, 0, 0 );
    let cam_target = new THREE.Vector3(0, 0, 50);
    animateCamera(camera, cam_target);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    let scene = new THREE.Scene();

    const texture = new THREE.TextureLoader().load('../assets/textures/MagicPattern.png');
    scene.background = texture;


    const ground_g = new THREE.PlaneGeometry(10000, 10000);
    const ground_m = new THREE.MeshPhongMaterial({ 
    color: 0x500b7f, 
    shininess: 100, 
    side: THREE.DoubleSide 
    });

    const ground = new THREE.Mesh(ground_g, ground_m);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -15;
    scene.add(ground);

    let a_light = new THREE.AmbientLight(0xffffff, 0.5);
    a_light.position.set(-50, 30, 100);
    scene.add(a_light);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(20, 5, 25);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight(0xffffff, 0.5);
    spotLight2.position.set(-20, 5, 25);
    spotLight2.castShadow = true;
    scene.add(spotLight2);

    scene.add(model);

    return {
        camera: camera,
        scene: scene,
        renderer: renderer,
        controls: controls
    }
}

function animate(context) {
    requestAnimationFrame(function () {
        animate(context)});

    TWEEN.update();
    context.controls.update();

    if (TWEEN.getAll().length === 0) context.scene.rotation.y += 0.01;

    context.renderer.render(context.scene, context.camera);
}

function animateLetter(object, target) {
    
    const positionT = new TWEEN.Tween(object.position)
        .to(target, 3000)
        .easing(TWEEN.Easing.Quadratic.Out);

    const rotationT = new TWEEN.Tween(object.rotation)
        .to({ y: object.rotation.y + Math.PI * 2 }, 3000)
        .easing(TWEEN.Easing.Linear.None);

    positionT.start();
    rotationT.start();
}

function animateCamera(camera, target) {
    const cameraT = new TWEEN.Tween(camera.position)
        .to(target, 3000)

    cameraT.start();
}


function letter_e(){

    let path_e = new THREE.Shape();

    path_e.moveTo(0.3, 0);
    path_e.bezierCurveTo(0.2, 0.41, -0.23, 0.41, -0.27, 0);
    path_e.quadraticCurveTo(-0.25, -0.37, 0.27, -0.27);

    path_e.lineTo(0.23, -0.18);
    path_e.quadraticCurveTo(-0.15, -0.28, -0.2, 0);
    path_e.lineTo(0.3, 0);

    path_e.moveTo(-0.2, 0.08);
    path_e.bezierCurveTo(-0.08, 0.28, 0.11, 0.28, 0.21, 0.08);
    path_e.lineTo(-0.2, 0.08);

    path_e.closePath();

    let geometry_e = new THREE.ExtrudeGeometry(path_e, extrude);
    let material_e = new THREE.MeshToonMaterial( {color: 0xf2f604} );
    let mesh_e = new THREE.Mesh(geometry_e, material_e);

    return mesh_e;
}

function letter_n() {
    
    let path_n = new THREE.Shape();

    path_n.moveTo(0.3, -0.08);
    path_n.lineTo(0.27, -0.08);

    path_n.quadraticCurveTo(0.28, 0, 0.26, 0.06);
    path_n.quadraticCurveTo(0.22, 0.1, 0.18, 0.06);
    path_n.quadraticCurveTo(0.16, -0.05, 0.18, -0.06);

    path_n.lineTo(0.18, -0.08);
    path_n.lineTo(0.13, -0.08);
    path_n.lineTo(0.13, -0.06);

    path_n.quadraticCurveTo(0.15, -0.07, 0.15, 0);
    path_n.quadraticCurveTo(0.15, 0.09, 0.13, 0.08);

    path_n.lineTo(0.13, 0.1);
    path_n.lineTo(0.16, 0.1);
    path_n.lineTo(0.16, 0.07); 

    path_n.bezierCurveTo(0.16, 0.11, 0.29, 0.12, 0.29, 0.04); 
    path_n.quadraticCurveTo(0.28, -0.06, 0.31, -0.07); 

    path_n.closePath();

    let geometry_n = new THREE.ExtrudeGeometry(path_n, extrude);
    let material_n = new THREE.MeshToonMaterial( {color: 0x046df6} );
    let mesh_n = new THREE.Mesh(geometry_n, material_n);

    return mesh_n;
}

function letter_f(){
    
    let path_f = new THREE.Shape();

    path_f.moveTo(0.33, -0.08);
    path_f.lineTo(0.38, -0.08);
    path_f.lineTo(0.38, -0.07);

    path_f.quadraticCurveTo(0.36, -0.07, 0.36, 0);

    path_f.lineTo(0.36, 0.09);
    path_f.lineTo(0.4, 0.09);
    path_f.lineTo(0.4, 0.1);
    path_f.lineTo(0.36, 0.1);

    path_f.quadraticCurveTo(0.36, 0.16, 0.4, 0.14);
    path_f.bezierCurveTo(0.41, 0.13, 0.42, 0.17, 0.36, 0.16);
    path_f.quadraticCurveTo(0.35, 0.15, 0.35, 0.1);

    path_f.lineTo(0.32, 0.1);
    path_f.lineTo(0.32, 0.09);
    path_f.lineTo(0.35, 0.09);
    path_f.lineTo(0.35, 0);

    path_f.quadraticCurveTo(0.35, -0.07, 0.33, -0.07);
    path_f.lineTo(0.33, -0.07);

    path_f.closePath();

    let geometry_f = new THREE.ExtrudeGeometry(path_f, extrude);
    let material_f = new THREE.MeshToonMaterial( {color: 0x43f113} );
    let mesh_f = new THREE.Mesh(geometry_f, material_f);

    return mesh_f;
}

function letter_i(){

    let path_i = new THREE.Shape();

    path_i.moveTo(0.5, -0.08);
    path_i.lineTo(0.59, -0.08);
    path_i.lineTo(0.59, -0.06);

    path_i.quadraticCurveTo(0.56, -0.06, 0.56, -0.03);
    path_i.lineTo(0.56, 0.1);

    path_i.lineTo(0.51, 0.1);
    path_i.lineTo(0.51, 0.09);
    path_i.quadraticCurveTo(0.53, 0.09, 0.54, 0.08);
    path_i.lineTo(0.54, -0.03);
    path_i.quadraticCurveTo(0.54, -0.06, 0.5, -0.06);
    path_i.lineTo(0.5, -0.08);

    path_i.closePath();

    let dot_i = new THREE.Shape();
    dot_i.absarc(0.54, 0.13, 0.02, 0, 2 * Math.PI, false);

    let geometry_body = new THREE.ExtrudeGeometry(path_i, extrude);
    let material_body = new THREE.MeshToonMaterial({ color: 0xa104f6 });
    let mesh_body = new THREE.Mesh(geometry_body, material_body);

    let dot_geometry = new THREE.ExtrudeGeometry(dot_i, extrude);
    let material_dot = new THREE.MeshToonMaterial({ color: 0xa104f6 });
    let mesh_dot = new THREE.Mesh(dot_geometry, material_dot);

    let mesh_i = new THREE.Object3D();
    mesh_i.add(mesh_body);
    mesh_i.add(mesh_dot);

   return mesh_i;
}

function letter_t(){

    let path_t = new THREE.Shape();

    path_t.moveTo(0.7, -0.08);
    path_t.quadraticCurveTo(0.65, -0.08, 0.65, -0.06);

    path_t.lineTo(0.65, 0.09);
    path_t.lineTo(0.63, 0.09);
    path_t.lineTo(0.63, 0.1);

    path_t.quadraticCurveTo(0.65, 0.1, 0.65, 0.12);

    path_t.lineTo(0.67, 0.12);
    path_t.lineTo(0.67, 0.1);
    path_t.lineTo(0.69, 0.1);
    path_t.lineTo(0.69, 0.09);
    path_t.lineTo(0.67, 0.09);
    path_t.lineTo(0.67, -0.06);

    path_t.quadraticCurveTo(0.68, -0.07, 0.7, -0.067);
    path_t.lineTo(0.7, -0.08);
    
    path_t.closePath();
    
    let geometry_t = new THREE.ExtrudeGeometry(path_t, extrude);
    let material_t = new THREE.MeshToonMaterial({ color: 0xf6041c });
    let mesh_t = new THREE.Mesh(geometry_t, material_t);
    
    return mesh_t;
}

function letter_ce() {
    let path_ce = new THREE.Shape();

    path_ce.moveTo(0.77, -0.14);
    path_ce.bezierCurveTo(0.82, -0.14, 0.81, -0.09, 0.79, -0.08);
    path_ce.lineTo(0.79, -0.07);

    path_ce.quadraticCurveTo(0.82, -0.07, 0.83, -0.07);
    path_ce.quadraticCurveTo(0.84, -0.07, 0.83, -0.05);
    path_ce.bezierCurveTo(0.7, -0.07, 0.78, 0.14, 0.82, 0.06);
    path_ce.quadraticCurveTo(0.84, 0.06, 0.83, 0.07);
    path_ce.bezierCurveTo(0.79, 0.16, 0.69, 0.01, 0.78, -0.07);

    path_ce.lineTo(0.78, -0.08);
    path_ce.lineTo(0.77, -0.08);
    path_ce.lineTo(0.77, -0.09);
    path_ce.bezierCurveTo(0.81, -0.09, 0.8, -0.13, 0.77, -0.13);
    path_ce.lineTo(0.77, -0.14);

    path_ce.closePath();

    let geometry_ce = new THREE.ExtrudeGeometry(path_ce, extrude);
    let material_ce = new THREE.MeshToonMaterial({ color: 0x04f2f6 });
    let mesh_ce = new THREE.Mesh(geometry_ce, material_ce);

    return mesh_ce;
}

function letter_o(){

    let path_o = new THREE.Shape();

    path_o.moveTo(0.94, -0.07);
    path_o.bezierCurveTo(1.03, -0.07, 1.03, 0.09, 0.94, 0.09);
    path_o.bezierCurveTo(0.85, 0.09, 0.84, -0.07, 0.94, -0.07);

    let hole_o = new THREE.Shape();
    hole_o.moveTo(0.94, 0.07);
    hole_o.bezierCurveTo(1, 0.06, 1, -0.05, 0.94, -0.05);
    hole_o.bezierCurveTo(0.88, -0.05, 0.87, 0.06, 0.94, 0.07);

    path_o.holes.push(hole_o);

    let geometry_o = new THREE.ExtrudeGeometry(path_o, extrude);
    let material_o = new THREE.MeshToonMaterial({ color: 0xf68504 });
    let mesh_o = new THREE.Mesh(geometry_o, material_o);

    return mesh_o;
}

function main(){
    let word = start(model());
    animate(word);
}