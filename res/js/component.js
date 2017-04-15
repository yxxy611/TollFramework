/**
 * @param {Array} container
 * @constructor
 */
TollGate = function (container) {
    ObjComponent.call(this,container);
    var gate = this;
    gate.setImageUrl('res/textures/UV_Grid_Sm.jpg');
    gate.setObjUrl('res/models/toll.obj');
};
TollGate.prototype = Object.create(ObjComponent.prototype);
