/**
 * construct the scene in this class
 * @param {SceneContainer} container
 * @constructor
 */
SceneConstructor = function (container) {
    var container = container;
    var gate, gatename, camerat101, cameratemp, camerat202;
    var lanenum = 8;
    var boothnum = lanenum - 1;
    var camera01pos = [[0, 2.5, -3 * 5.37], [0, 2.5, -2 * 5.37], [0, 2.5, -1 * 5.37], [0, 2.5, 0], [0, 2.5, 5.37], [0, 2.5, 2 * 5.37], [0, 2.5, 3 * 5.37]];
    var camera02pos = [[-6, 1.5, -3.5 * 5.37], [-6, 1.5, -2.5 * 5.37], [-6, 1.5, -1.5 * 5.37], [-6, 1.5, -0.5* 5.37], [-6, 1.5, 0.5* 5.37], [6, 1.5, 1.5 * 5.37],[6, 1.5, 2.5 * 5.37], [6, 1.5, 3.5 * 5.37]];
    var camera01id = [];
    var camera02id = [];

    this.init = function () {
        gate = new LoadedComp(container);
        //gate.setImageUrl('res/textures/RGB.png');
        gate.setObjUrl('res/models/Toll_zhuozhou_south.obj');
        gate.setWireframe(true);
        gate.createMesh();

        gatename = new LoadedComp(container);
        gatename.setObjUrl('res/models/Toll_zhuozhou_south_name.obj');
        gatename.setMatColor(0xff0000);
        gatename.createMesh();

        for (var i = 0; i < boothnum; i++) {

            cameratemp = new LoadedComp(container);
            cameratemp.setTextureUrl("res/textures/security-camera-icon.png");
            cameratemp.setPickAble(true);
            cameratemp.setName('camera01' + ':' + i);
            cameratemp.setPos(camera01pos[i]);
            cameratemp.createSprite();
        }
        for (i = 0; i < lanenum; i++) {

            cameratemp = new LoadedComp(container);
            cameratemp.setTextureUrl("res/textures/security-camera-icon02.png");
            cameratemp.setPickAble(true);
            cameratemp.setName('camera02' + ':' + i);
            cameratemp.setPos(camera02pos[i]);
            cameratemp.createSprite();
        }
            // camerat101 = new LoadedComp(container);
            // camerat101.setTextureUrl("res/textures/security-camera-icon.png");
            // camerat101.setPickAble(true);
            // camerat101.setName('camera123123');
            // camerat101.setPos(0,2.5,0);
            // camerat101.createSprite();
            //
            // camerat203 = new LoadedComp(container);
            // camerat203.setTextureUrl('res/textures/security-camera-icon02.png');
            // camerat203.setPos(-4,1.5,0.5);
            // camerat203.setPickAble(true);
            // camerat203.setName('camera123123');
            // camerat203.createSprite();
            //
            // camerat204 = new LoadedComp(container);
            // camerat204.setTextureUrl('res/textures/security-camera-icon02.png');
            // camerat204.setPos(-4,1.5,-0.5);
            // camerat204.setPickAble(true);
            // camerat204.setName('camera123123');
            // camerat204.createSprite();
            //
            // camerat101 = new LoadedComp(container);
            // camerat101.setTextureUrl("res/textures/security-camera-icon.png");
            // camerat101.setPickAble(true);
            // camerat101.setName('camera123123');
            // camerat101.setPos(0,2.5,5.45);
            // camerat101.createSprite();
            //
            // camerat203 = new LoadedComp(container);
            // camerat203.setTextureUrl('res/textures/security-camera-icon02.png');
            // camerat203.setPos(-4,1.5,5.95);
            // camerat203.setPickAble(true);
            // camerat203.setName('camera123123');
            // camerat203.createSprite();
            //
            // camerat204 = new LoadedComp(container);
            // camerat204.setTextureUrl('res/textures/security-camera-icon02.png');
            // camerat204.setPos(-4,1.5,4.95);
            // camerat204.setPickAble(true);
            // camerat204.setName('camera123123');
            // camerat204.createSprite();

            // camerat201 = new LoadedComp(container);
            // camerat201.setObjUrl('res/models/cameraType02.obj');
            // camerat201.setPos(-4,0,0);
            // camerat201.setOri(0,0.5,0);
            // camerat201.setPickAble(true);
            // camerat201.setName('camera');
            // camerat201.setMatColor(0x13d2dd);
            // camerat201.createMesh();
            // camerat202 = new LoadedComp(container);
            // camerat202.setObjUrl('res/models/cameraType02.obj');
            // camerat202.setPos(-4,0,1);
            // camerat202.setOri(0,-0.5,0);
            // camerat202.setPickAble(true);
            // camerat202.setName('camera');
            // camerat202.setMatColor(0x13d2dd);
            // camerat202.createMesh();

        }
    };