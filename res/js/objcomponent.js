/**
 * @param {Array} container
 * @constructor
 */
ObjComponent = function (container) {

    THREE.Object3D.call(this);

    var obj = this;
    var position = new THREE.Vector3(0, 0, 0);
    var orientation = new THREE.Vector3(0, 0, 0);
    var scene = container[0];
    var imageloader = container[1];
    var objloader = container[2];
    var clickobj = container[3];
    var texture = new THREE.Texture();
    var imageurl;
    var objurl;
    var interactive = false;
    var wireframe = false;
    this.name = 'Toll Gate';
    var wireframemat = new THREE.MeshBasicMaterial({wireframe: true});
    var normalmat = new THREE.MeshPhongMaterial({color: 0x13d2dd})
    //var normalmat = new THREE.MeshPhongMaterial()
    //obj.castShadow = true;


    this.createMesh = function () {
        imageloader.load(imageurl, function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });
        objloader.load(objurl, function (o) {
            for (var i = 0, l = o.children.length; i < l; i++) {
                if (wireframe) {
                    o.children[0].material = wireframemat;
                }
                else {
                    if (imageurl) {
                        o.children[0].material.map = texture;
                    }
                    else {
                        o.children[0].material = normalmat;
                    }

                }
                o.children[0].castShadow = true;
                o.children[0].receiveShadow = true;
                obj.add(o.children[0]);
            }
            obj.position.x = position.x;
            obj.position.y = position.y;
            obj.position.z = position.z;
            obj.rotateX(orientation.x);
            obj.rotateY(orientation.y);
            obj.rotateZ(orientation.z);

            if (interactive) {
                clickobj.push(obj);
            }
            scene.add(obj);
        }, onProgress, onError);
    };
    this.setPos = function (a, b, c) {
        console.log(this.name + ':' + 'set pos' + '(' + a + ',' + b + ',' + c + ')');
        position.x = a;
        position.y = b;
        position.z = c;
    };
    this.setOri = function (a, b, c) {
        orientation.x = a;
        orientation.y = b;
        orientation.z = c;
    };
    this.setPickAble = function (boolean) {
        interactive = boolean;
    };
    this.setImageUrl = function (url) {
        imageurl = url;
    };
    this.setObjUrl = function (url) {
        objurl = url;
    }
    this.setWireframe = function (boolean) {
        wireframe = boolean;
    }
    this.setName = function (string) {
        this.name = string;
    }
};

ObjComponent.prototype = Object.create(THREE.Object3D.prototype);

/**
 * @param {THREE.Scene} scene
 * @param {THREE.ImageLoader} imageloader
 * @param {THREE.OBJLoader} objloader
 * @param {Array} clickobj
 * @constructor
 */
SceneContainer = function (scene, imageloader, objloader, clickobj) {
    var container = [];
    container.push(scene, imageloader, objloader, clickobj);
    return container;
};

onProgress = function (xhr) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
};
onError = function (xhr) {
};