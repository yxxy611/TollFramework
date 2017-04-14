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
TollGate = function (scene, manager) {
    this.interactive = false;
    var gate;
    var position = new THREE.Vector3(0,0,0);
    var imageloader = new THREE.ImageLoader(manager);
    var objloader = new THREE.OBJLoader(manager);
    var texture = new THREE.Texture();
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };
    this.getPart = function () {
        return gate;
    }
    this.createMesh = function () {
        imageloader.load('res/textures/UV_Grid_Sm.jpg', function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });
        objloader.load('res/models/toll.obj', function (o) {
            for (var i = 0, l = o.children.length; i < l; i++) {
                o.children[0].material.map = texture;
                o.children[0].position.x = position.x;
                o.children[0].position.y = position.y;
                o.children[0].position.z = position.z;
                //scene.add(o.children[i]);
                scene.add(o.children[0])
            }
            ;
        }, onProgress, onError);
    }
    this.setPos = function (a, b, c) {
        console.log("我是一个大傻逼");
        position.x = a;
        position.y = b;
        position.z = c;
    }
    this.setPickAble = function (boolean) {
//TODO: implement pick-able SWITCH
        this.interactive = boolean;

    }
};
// TollGate = function (scene, manager) {
//     //var gate = new ObjComponent(manager, 'res/textures/UV_Grid_Sm.jpg', 'res/models/toll.obj').getGroup();
//     var gate;
//     gate = new ObjComponent(scene, manager, 'res/textures/UV_Grid_Sm.jpg', 'res/models/toll.obj').getGroup();
//     console.log("group children length" + ":" + gate.children.length)
//     this.getPart = function () {
//         return gate;
//     }
//     this.setPos = function (a, b, c) {
//         console.log("我是一个大傻逼");
//         gate.position.x = a;
//         gate.position.y = b;
//         gate.position.z = c;
//     }
// };
TestDummy = function () {
    var age;
    this.setAge = function (a) {
        age = a;
    }
    this.getAge = function () {
        alert(age);
    }
}