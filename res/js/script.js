/**
 * Created by yxxy6 on 2017/4/11.
 */
// Initialize scene

function start() {

    var tollgates = [];
    var cctvs = [];

    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    console.log(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xaaaaaa);
    document.body.appendChild(renderer.domElement);
    //camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 15;
    // camera.up = new THREE.Vector3(0, 0, 1);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 10;
    controls.maxDistance = 7500;
    //light
    var ambient = new THREE.AmbientLight(0x666666, 0.5);
    scene.add(ambient);
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 0, 1);
    scene.add(light);

    //ar layoutDesigner = new LayoutDesigner(scene);

    function initLayout() {
        var gate = new TollGate();
        //layoutDesigner.addTollGate(gate);
        scene.add(gate);
    }

    function render() {

        requestAnimationFrame(render);
        renderer.render(scene, camera);

    };

    initLayout();
    render();
}
window.onload = start;
