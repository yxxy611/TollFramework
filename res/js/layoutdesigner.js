/**
 * Created by yxxy6 on 2017/4/11.
 * @param {THREE.Scene} scene
 * @constructor
 */
LayoutDesigner = function (scene) {
    var tgs = [];
    var cs = [];
    this.addTollGate = function (tg) {
        tgs.push(tg);
        scene.add(tg);
    };
    this.addCCTV = function (c) {
        cs.push(c);
        scene.add(c);
    };
};