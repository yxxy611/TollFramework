/**
 * @param {SceneContainer} container
 * @constructor
 */
TollGate_deprecated = function (container) {
    ObjComponent.call(this,container);
    var gate = this;
    gate.setImageUrl('res/textures/RGB.png');
    gate.setObjUrl('res/models/Toll_zhuozhou_south.obj');
};
TollGate_deprecated.prototype = Object.create(ObjComponent.prototype);
TollGate = function(container){
    var container = container;
    var gate,booth,camerat101,camerat201;
    this.init = function () {
        gate = new ObjComponent(container);
        gate.setImageUrl('res/textures/RGB.png');
        gate.setObjUrl('res/models/Toll_zhuozhou_south.obj');
        gate.setWireframe(false);
        gate.createMesh();
        booth = new ObjComponent(container);
        booth.setObjUrl('res/models/Toll_zhuozhou_south_booth.obj');
        booth.setWireframe(true);
        booth.createMesh();
        camerat101 = new ObjComponent(container);
        camerat101.setObjUrl('res/models/cameraType01.obj');
        camerat101.setPickAble(true);
        camerat101.setName('camera');
        camerat101.createMesh();
        camerat201 = new ObjComponent(container);
        camerat201.setObjUrl('res/models/cameraType02.obj');
        camerat201.setPos(-4,0,0)
        camerat201.setOri(0,0.5,0)
        camerat201.setPickAble(true);
        camerat201.setName('camera');
        camerat201.createMesh();

    }
};