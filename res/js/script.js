/**
 * Created by yxxy6 on 2017/4/11.
 */
// Initialize scene

function start() {

    var tollgates = [];
    var cctvs = [];
    var mes = 123;

    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    var mouse = new THREE.Vector2(), INTERSECTED;
    var raycaster = new THREE.Raycaster();

    renderer.setPixelRatio(window.devicePixelRatio);
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
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 0, 1);
    scene.add(ambient);
    scene.add(light);
    //load manager
    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('click', onDocumentClick, false);
    window.addEventListener('resize', onWindowResize, false);

    //ar layoutDesigner = new LayoutDesigner(scene);

    function initLayout() {
        //var gate = new ObjComponent();
        var gate1 = new TollGate(scene, manager);
        gate1.setPos(0, 0, 0);
        gate1.createMesh();
        //layoutDesigner.addTollGate(gate);


    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        // find intersections
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {

            if (INTERSECTED != intersects[0].object) {

                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

                INTERSECTED = intersects[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex(0xff0000);

            }

        }
        else {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = null;

        }

        renderer.render(scene, camera);

    };
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {

        event.preventDefault();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
    }

    function onDocumentClick(event) {
        event.preventDefault();
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            alert(INTERSECTED.name);
           // window.open("http://localhost:63342/TollFramework/index.html");
        }
    }


    initLayout();
    animate();
}
window.onload = start;
