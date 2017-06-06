/**
 * Created by yxxy6 on 2017/4/11.
 */
// Initialize scene
//configure scenario & rendering parameters

function start(ju) {

    var container;
    var clickobj = [];
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer({antialias: true});
    var mouse = new THREE.Vector2(), INTERSECTED;
    var raycaster = new THREE.Raycaster();
    var targetObject = new THREE.Object3D();
    var groundcolor = 0x291f08; //背景地面颜色 16进制

    var treepos = [new THREE.Vector3(-30, -1, 30),
        new THREE.Vector3(-10, -1, 30),
        new THREE.Vector3(0, -1, 30),
        new THREE.Vector3(10, -1, 30),
        new THREE.Vector3(40, -1, 30),
        new THREE.Vector3(-20, -1, -30),
        new THREE.Vector3(10, -1, -30),
        new THREE.Vector3(30, -1, -30),
        new THREE.Vector3(40, -1, -30),
        new THREE.Vector3(50, -1, -30)];//树木位置
    var tree = [];
    var rotaxis = new THREE.Vector3();
    var b, v, yhat, rotangle;


    scene.add(targetObject);
    scene.fog = new THREE.FogExp2(0xffffff, 0.005);//雾颜色及浓度
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
    var ambient = new THREE.AmbientLight(0xffffff, 0.8);//环境光颜色及强度
    var light = new THREE.PointLight(0xffffff, 1);//点光源强度及颜色
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
    // prepare ShaderMaterial without textures 天空盒材质参数
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
        color: groundcolor, opacity: 1,
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
            doubleClick(INTERSECTED);
        }
    }

    SceneComposer(container, ju);
    animate();
}
/**
 * function for loading meshes and icons
 * @param {Array} container
 * @constructor
 */
LoadedComp = function (container) {

    THREE.Object3D.call(this);
    var obj = this;
    var position = new THREE.Vector3(0, 0, 0);
    var orientation = new THREE.Vector3(0, 0, 0);
    var scene = container[0];
    var imageloader = container[1];
    var textureloader = container[2];
    var objloader = container[3];
    var clickobj = container[4];
    var texture = new THREE.Texture();
    var imageurl, objurl, textureurl;
    var interactive = false;
    var wireframe = false;
    var hexcolor = 0xffffff;
    var mapsprite, materialsprite;
    var mat = new THREE.MeshStandardMaterial({
        opacity: 1,
        transparent: true, side: THREE.FrontSide, metalness: 0, roughness: 1
    });
    var wireframemat, normalmat;
    var iconscale = 1;
    this.idnum = 'unknown';

    this.createSprite = function () {
        mapsprite = textureloader.load(textureurl);
        materialsprite = new THREE.SpriteMaterial({map: mapsprite, color: 0xffffff, fog: false});
        var sprite = new THREE.Sprite(materialsprite);
        sprite.scale.set(iconscale, iconscale, iconscale);
        obj.position.set(position.x, position.y, position.z);
        obj.add(sprite);
        scene.add(obj);
        if (interactive) {
            clickobj.push(obj);
        }
    };
    this.createMesh = function () {
        imageloader.load(imageurl, function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });
        objloader.load(objurl, function (o) {
            for (var i = 0, l = o.children.length; i < l; i++) {
                if (wireframe) {
                    wireframemat = new THREE.MeshBasicMaterial({wireframe: true, color: hexcolor});
                    o.children[0].material = wireframemat;
                }
                else {
                    if (imageurl) {
                        // mat = new THREE.MeshStandardMaterial({opacity: 1,
                        //     transparent: true,map:texture,side: THREE.FrontSide,metalness:0,roughness:1 });
                        mat.map = texture;
                        o.children[0].material = mat;
                    }
                    else {
                        normalmat = new THREE.MeshPhongMaterial({side: THREE.FrontSide, color: hexcolor});
                        o.children[0].material = normalmat;
                    }

                }
                o.children[0].castShadow = true;
                //o.children[0].receiveShadow = true;
                obj.add(o.children[0]);
            }
            obj.position.set(position.x, position.y, position.z);
            obj.rotateX(orientation.x);
            obj.rotateY(orientation.y);
            obj.rotateZ(orientation.z);

            if (interactive) {
                clickobj.push(obj);
            }
            scene.add(obj);
        }, onProgress, onError);
    };
    this.setIconSize = function (a) {
        iconscale = a;
    };
    this.setPos = function (array) {
        //console.log(this.name + ':' + 'set pos' + '(' + array[0] + ',' + array[1] + ',' + array[2] + ')');
        position.x = array[0];
        position.y = array[1];
        position.z = array[2];
    };
    this.setOri = function (array) {
        orientation.x = array[0];
        orientation.y = array[1];
        orientation.z = array[2];
    };
    this.setPickAble = function (boolean) {
        interactive = boolean;
    };
    this.setImageUrl = function (url) {
        imageurl = url;
    };
    this.setTextureUrl = function (url) {
        textureurl = url;
    };
    this.setObjUrl = function (url) {
        objurl = url;
    };
    this.setWireframe = function (boolean) {
        wireframe = boolean;
    };
    this.setName = function (string) {
        this.idnum = string;
    };
    this.setMat = function (m) {
        mat = m;

    };
    this.setMatColor = function (hex) {
        hexcolor = hex;
    }
};

LoadedComp.prototype = Object.create(THREE.Object3D.prototype);

/**
 * @param {THREE.Scene} scene
 * @param {THREE.ImageLoader} imageloader
 * @param {THREE.OBJLoader} objloader
 * @patam {THREE.TextureLoader} textureloader
 * @param {Array} clickobj
 * @constructor
 */
SceneContainer = function (scene, imageloader, textureloader, objloader, clickobj) {
    var container = [];
    container.push(scene, imageloader, textureloader, objloader, clickobj);
    return container;
};

onProgress = function (xhr) {
    // if (xhr.lengthComputable) {
    //     var percentComplete = xhr.loaded / xhr.total * 100;
    //     console.log(Math.round(percentComplete, 2) + '% downloaded');
    // }
};
onError = function (xhr) {
};

//window.onload = start;
