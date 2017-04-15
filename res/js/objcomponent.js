/**
 * @param {Array} container
 * @constructor
 */
ObjComponent = function (container) {

    THREE.Object3D.call(this);

    var obj = this;
    var position = new THREE.Vector3(0, 0, 0);
    var scene = container[0];
    var imageloader = container[1];
    var objloader = container[2];
    var clickobj = container[3];
    var texture = new THREE.Texture();
    var imageurl;
    var objurl;
    var interactive = false;
    this.name = 'Toll Gate';


    this.createMesh = function () {
        imageloader.load(imageurl, function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });
        objloader.load(objurl, function (o) {
            for (var i = 0, l = o.children.length; i < l; i++) {
                o.children[0].material.map = texture;
                obj.add(o.children[0]);
            }
            obj.position.x = position.x;
            obj.position.y = position.y;
            obj.position.z = position.z;

            if(interactive){
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
    this.setPickAble = function (boolean) {
        interactive = boolean;
    };
    this.setImageUrl = function(url) {
        imageurl = url;
    };
    this.setObjUrl = function(url) {
        objurl = url;
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
SceneContainer = function(scene,imageloader,objloader,clickobj){
    var container = [];
    container.push(scene,imageloader,objloader,clickobj);
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