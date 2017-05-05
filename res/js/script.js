/**
 * Created by yxxy6 on 2017/4/11.
 */
// Initialize scene
//config scenario & rendering parameters


function start() {

    var container;
    var clickobj = [];
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer({antialias: true});
    var mouse = new THREE.Vector2(), INTERSECTED;
    var raycaster = new THREE.Raycaster();
    var targetObject = new THREE.Object3D();

    var depthMaterial, effectComposer, depthRenderTarget;
    var ssaoPass,msaaRenderPass;

    scene.add(targetObject);
    scene.fog = new THREE.FogExp2(0x000000, 0.005);
    //renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    //renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
    controls.maxDistance = 750;

    //light
    var ambient = new THREE.AmbientLight(0xffffff, 0.8);
    var light = new THREE.PointLight(0xffffff, 1);
    light.castShadow = true;
    light.target = targetObject;
    light.position.set(50, 50, 50);
    scene.add(ambient);
    scene.add(light);
    //Set up shadow properties for the light
    light.shadow.mapSize.width = 1024;  // default
    light.shadow.mapSize.height = 1024; // default
    light.shadow.camera.near = 0.5;       // default
    light.shadow.camera.far = 500;      // default
    var d = 50;

    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;


    //ground
    // var geometry = new THREE.PlaneBufferGeometry( 16000, 16000 );
    // var material = new THREE.MeshPhongMaterial({ color:0xaaaaaa});
    // var ground = new THREE.Mesh( geometry, material );
    // ground.rotation.x = -Math.PI/2;
    //scene.add(ground);
    //load manager
    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        // console.log(item, loaded, total);
    };
    var imageloader = new THREE.ImageLoader(manager);
    var textureloader = new THREE.TextureLoader(manager);
    var objloader = new THREE.OBJLoader(manager);

    container = new SceneContainer(scene, imageloader, textureloader, objloader, clickobj);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('dblclick', onDocumentClick, false);
    window.addEventListener('resize', onWindowResize, false);


    function initLayout() {

        var layout = new SceneConstructor(container);
        layout.init();
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

                if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);//

                INTERSECTED = intersects[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex();//始终保持current为初始值
                INTERSECTED.material.color.setHex(0x00ffff);

            }

        }
        else {

            if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

            INTERSECTED = null;

        }
        if (true) {
            // Render depth into depthRenderTarget
            scene.overrideMaterial = depthMaterial;
            renderer.render(scene, camera, depthRenderTarget, true);

            // Render renderPass and SSAO shaderPass
            scene.overrideMaterial = null;
            effectComposer.render();
        }
        else {

            renderer.render(scene, camera);
        }


    }

    function initPostprocessing() {

        // Setup render pass
        var renderPass = new THREE.RenderPass(scene, camera);
        effectComposer = new THREE.EffectComposer(renderer);
        effectComposer.addPass(renderPass);
        // Setup depth pass
        depthMaterial = new THREE.MeshDepthMaterial();
        depthMaterial.depthPacking = THREE.RGBADepthPacking;
        depthMaterial.blending = THREE.NoBlending;

        var pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter};
        depthRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, pars);
        depthRenderTarget.texture.name = "SSAOShader.rt";

        // Setup SSAO pass
        ssaoPass = new THREE.ShaderPass(THREE.SSAOShader);
        ssaoPass.uniforms["tDepth"].value = depthRenderTarget.texture;
        ssaoPass.uniforms['size'].value.set(window.innerWidth, window.innerHeight);
        ssaoPass.uniforms['cameraNear'].value = camera.near;
        ssaoPass.uniforms['cameraFar'].value = camera.far;
        ssaoPass.uniforms['onlyAO'].value = false;
        ssaoPass.uniforms['aoClamp'].value = 1;
        ssaoPass.uniforms['lumInfluence'].value = 1;
        ssaoPass.renderToScreen = false;
        // Setup Anti Aliasing pass
        msaaRenderPass = new THREE.SMAAPass( window.innerWidth, window.innerHeight );
        msaaRenderPass.renderToScreen = true;
        // Add pass to effect composer
        effectComposer.addPass(ssaoPass);
        effectComposer.addPass( msaaRenderPass );


    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        effectComposer.setSize(window.innerWidth, window.innerHeight);
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
            //TODO：implement functions while double clicking on objects 双击图标实现功能
            alert(INTERSECTED.parent.idnum);
            // window.open("http://localhost:63342/TollFramework/index.html");
        }
    }

    // Init postprocessing
    initPostprocessing();

    initLayout();
    animate();
}
window.onload = start;

