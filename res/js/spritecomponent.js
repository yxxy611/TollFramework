/**
 * Created by yxxy6 on 2017/4/25.
 */
SpriteComponent = function(container){
    THREE.Object3D.call(this);
    var sprite = this;
    var position = new THREE.Vector3(0, 0, 0);
    var scene = container[0];
    var clickobj = container[3];
    var spriteurl;
    var interactive = false;
};
SpriteComponent.prototype = Object.create(THREE.Object3D.prototype);