/**
 * Created by yxxy6 on 2017/4/11.
 */
// Initialize scene

function start() {

    var container;
    var clickobj = [];
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    var mouse = new THREE.Vector2(), INTERSECTED;
    var raycaster = new THREE.Raycaster();

    var targetObject = new THREE.Object3D();
    scene.add(targetObject);
    scene.fog = new THREE.FogExp2( 0x000000, 0.01 );
    //renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    //renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);


    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.target = targetObject;
    camera.position.x = 60;
    camera.position.y = 20;
    camera.position.z = 20;

    //controller
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 10;
    controls.maxDistance = 7500;

    //light
    var ambient = new THREE.AmbientLight(0x666666, 0.5);
    var light = new THREE.PointLight(0xffffff, 1);
    light.castShadow = true;
    light.target = targetObject;
    light.position.set(50, 50, 50);
    scene.add(ambient);
    scene.add(light);
    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512;  // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5;       // default
    light.shadow.camera.far = 500;      // default


    //load manager
    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    var imageloader = new THREE.ImageLoader(manager);
    var objloader = new THREE.OBJLoader(manager);

    container = new SceneContainer(scene, imageloader, objloader, clickobj);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('dblclick', onDocumentClick, false);
    window.addEventListener('resize', onWindowResize, false);


    function initLayout() {

        var gate1 = new TollGate(container);
        gate1.init();
       //  gate1.setPickAble(false);
       //  gate1.setWireframe(false);
       //  gate1.setPos(0, 0, 0);
       //  gate1.createMesh();
       //  gate1.name = 'Toll Gate 1';
       //  var gate2 = new TollGate(container);
       //  gate2.setPos(-10, 0, 0);
       // // gate2.createMesh();
       //  gate2.name = 'Toll Gate 2'


    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        // find intersections
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(clickobj, true);
        if (intersects.length > 0) {

            if (INTERSECTED !== intersects[0].object) {

                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);//

                INTERSECTED = intersects[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();//始终保持current为初始值
                INTERSECTED.material.emissive.setHex(0xff0000);

            }

        }
        else {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = null;

        }
        renderer.render(scene, camera);


    }
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

        var intersects = raycaster.intersectObjects(clickobj, true);

        if (intersects.length > 0) {
            //TODO：implement functions while double clicking on objects
            alert(INTERSECTED.parent.name);
            // window.open("http://localhost:63342/TollFramework/index.html");
        }
    }

    initLayout();
    animate();
}
window.onload = start;

