/**
 * Created by yxxy6 on 2017/4/11.
 */
// Initialize scene
//configure scenario & rendering parameters


function start() {

    var container;
    var clickobj = [];
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer({antialias: true});
    var mouse = new THREE.Vector2(), INTERSECTED;
    var raycaster = new THREE.Raycaster();
    var targetObject = new THREE.Object3D();

    var depthMaterial, effectComposer, depthRenderTarget;
    var ssaoPass, msaaRenderPass;
    var treepos = [new THREE.Vector3(-30, 0, 30), new THREE.Vector3(-10, 0, 30), new THREE.Vector3(0, 0, 30), new THREE.Vector3(10, 0, 30), new THREE.Vector3(40, 0, 30), new THREE.Vector3(-20, 0, -30), new THREE.Vector3(10, 0, -30), new THREE.Vector3(30, 0, -30), new THREE.Vector3(40, 0, -30), new THREE.Vector3(50, 0, -30)];
    var tree = [];
    var rotaxis = new THREE.Vector3();
    var b, v, yhat, rotangle;


    scene.add(targetObject);
    scene.fog = new THREE.FogExp2(0xffffff, 0.005);
    //renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
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
    controls.maxDistance = 100;

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

    //sky
    // prepare ShaderMaterial without textures
    var vertexShader = document.getElementById('sky-vertex').textContent,
        fragmentShader = document.getElementById('sky-fragment').textContent;
    var uniforms = {
        topColor: {type: "c", value: new THREE.Color(0x0044ff)},
        bottomColor: {type: "c", value: new THREE.Color(0xffffff)},
        offset: {type: "f", value: 2},
        exponent: {type: "f", value: 0.6}
    };
    var skyMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        side: THREE.BackSide,
        fog: false
    });
// create Mesh with sphere geometry and add to the scene
    var skyBox = new THREE.Mesh(new THREE.SphereGeometry(500, 60, 40), skyMaterial);
    scene.add(skyBox);

    //ground
    var geometry = new THREE.PlaneBufferGeometry(16000, 16000);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff, opacity: 1,
        transparent: true, side: THREE.FrontSide, metalness: 0, roughness: 1
    });
    var ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    scene.add(ground);
    //tree
    var treemat = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('res/textures/tree_01.png'),
        side: THREE.DoubleSide,
        transparent: true,
        alphaTest: 0.5
    });
    var treegeo = new THREE.Geometry();
    treegeo.vertices.push(
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(10, 20, 0),
        new THREE.Vector3(-10, 20, 0)
    );
    treegeo.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3));
    treegeo.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)]);
    treegeo.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)]);
    var max = 1.2;
    var min = 0.8;
    var scale;
    for (var i = 0; i < treepos.length; i++) {
        tree[i] = new THREE.Mesh(treegeo, treemat);
        scale = Math.random() * (max - min) + min;
        tree[i].scale.set(scale, scale, 1);
        scene.add(tree[i])
    }


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

        SceneComposer(container);
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
        if (false) {
            // Render depth into depthRenderTarget
            scene.overrideMaterial = depthMaterial;
            renderer.render(scene, camera, depthRenderTarget, true);

            // Render renderPass and SSAO shaderPass
            scene.overrideMaterial = null;
            effectComposer.render();
        }
        else {


            //////////////////////////////////////////////////////////////////////


            for (i = 0; i < treepos.length; i++) {
                yhat = new THREE.Vector3(0, 1, 0);
                v = camera.position.clone();
                v.sub(treepos[i]);  // v-b
                v.sub(yhat.multiplyScalar(v.dot(yhat)));
                v.normalize();  // pxz

                rotangle = Math.acos(v.dot(new THREE.Vector3(0, 0, 1)));
                rotaxis.crossVectors(new THREE.Vector3(0, 0, 1), v);
                if (rotaxis.dot(new THREE.Vector3(0, 1, 0)) < 0) rotangle *= -1;

                tree[i].rotation.y = rotangle;
                tree[i].position.copy(treepos[i]);
            }


            renderer.render(scene, camera);
        }


    }

    // function initPostprocessing() {
    //
    //     // Setup render pass
    //     var renderPass = new THREE.RenderPass(scene, camera);
    //     effectComposer = new THREE.EffectComposer(renderer);
    //     effectComposer.addPass(renderPass);
    //     // Setup depth pass
    //     depthMaterial = new THREE.MeshDepthMaterial();
    //     depthMaterial.depthPacking = THREE.RGBADepthPacking;
    //     depthMaterial.blending = THREE.NoBlending;
    //
    //     var pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter};
    //     depthRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, pars);
    //     depthRenderTarget.texture.name = "SSAOShader.rt";
    //
    //     // Setup SSAO pass
    //     ssaoPass = new THREE.ShaderPass(THREE.SSAOShader);
    //     ssaoPass.uniforms["tDepth"].value = depthRenderTarget.texture;
    //     ssaoPass.uniforms['size'].value.set(window.innerWidth, window.innerHeight);
    //     ssaoPass.uniforms['cameraNear'].value = camera.near;
    //     ssaoPass.uniforms['cameraFar'].value = camera.far;
    //     ssaoPass.uniforms['onlyAO'].value = false;
    //     ssaoPass.uniforms['aoClamp'].value = 1;
    //     ssaoPass.uniforms['lumInfluence'].value = 1;
    //     ssaoPass.renderToScreen = false;
    //     // Setup Anti Aliasing pass
    //     msaaRenderPass = new THREE.SMAAPass(window.innerWidth, window.innerHeight);
    //     msaaRenderPass.renderToScreen = true;
    //     // Add pass to effect composer
    //     effectComposer.addPass(ssaoPass);
    //     effectComposer.addPass(msaaRenderPass);
    //
    //
    // }

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
    // initPostprocessing();

    initLayout();
    animate();
}
window.onload = start;

