/**
 * Created by yxxy6 on 2017/4/11.
 */
TollGate = function (manager, scene) {
    var imageloader = new THREE.ImageLoader(manager);
    var objloader = new THREE.OBJLoader(manager);
    var texture = new THREE.Texture();
    var group = new THREE.Object3D();

    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };
    imageloader.load('res/textures/UV_Grid_Sm.jpg', function (image) {
        texture.image = image;
        texture.needsUpdate = true;
    });
    objloader.load('res/models/toll.obj', function (o) {
        o.children[0].material.map = texture;
        o.children[1].material.map = texture;
        console.log(o.children[0].ismesh);
        //scene.add(o);
        group.add(o);
    }, onProgress, onError);
    return group;
};
