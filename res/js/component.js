/**
 * Created by yxxy6 on 2017/4/11.
 */
TollGate = function () {
    var object = new THREE.Mesh( new THREE.BoxGeometry( 1, 1.5, 12, 4, 4, 4) ,new THREE.MeshLambertMaterial( { side: THREE.DoubleSide } ));
    return object;
};