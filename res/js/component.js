/**
 * Created by yxxy6 on 2017/4/11.
 */
ObjComponent = function (scene, manager, imageurl, objeurl) {
    //TODO:implement inheritance
    var imageloader = new THREE.ImageLoader(manager);
    var objloader = new THREE.OBJLoader(manager);
    var texture = new THREE.Texture();
    var group = new THREE.Group();

    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };

    this.getGroup = function () {

        return group;

    }
    this.updateMesh = function () {
        imageloader.load(imageurl, function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });
        objloader.load(objeurl, function (o) {
            for (var i = 0, l = o.children.length; i < l; i++) {
                o.children[0].material.map = texture;
                scene.add(o.children[0]);
            }

        }, onProgress, onError);

    }
};
PrimitiveComponent = function () {
//TODO:class for primitives
}
//hardcoded class
TollGate = function (container) {

    THREE.Object3D.call(this);

    var gate = this;
    var position = new THREE.Vector3(0, 0, 0);
    var scene = container[0];
    var imageloader = container[1];
    var objloader = container[2];
    var clickobj = container[3];
    var texture = new THREE.Texture();
    var group = new THREE.Group()

    this.name = 'Toll Gate'
    var interactive = false;

    this.createMesh = function () {
        imageloader.load('res/textures/UV_Grid_Sm.jpg', function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });
        objloader.load('res/models/toll.obj', function (o) {
            for (var i = 0, l = o.children.length; i < l; i++) {
                o.children[0].material.map = texture;
                gate.add(o.children[0]);
            }
            ;
            gate.position.x = position.x;
            gate.position.y = position.y;
            gate.position.z = position.z;

            if(interactive){
                clickobj.push(gate);
            }
            scene.add(gate);
        }, onProgress, onError);
    };
    this.setPos = function (a, b, c) {
        console.log(this.name + ':' + 'set pos' + '(' + a + ',' + b + ',' + c + ')');
        position.x = a;
        position.y = b;
        position.z = c;
    };
    this.setPickAble = function (boolean) {
//TODO: implement pick-able SWITCH
        interactive = boolean;
    }
};
TollGate.prototype = Object.create(THREE.Object3D.prototype);

/////////////////////////////////////////////////////////////

onProgress = function (xhr) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
};
onError = function (xhr) {
};