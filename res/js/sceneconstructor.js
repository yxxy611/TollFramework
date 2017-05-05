/**
 * construct the scene in this class
 * @param {SceneContainer} container
 * @constructor
 */
// construct scene layout
// 创建场景布局
SceneConstructor = function (container) {
    var container = container;
    var gate, gatename,road,road,tempobj;
    // 相机位置
    var camera01pos = [[0, 3.5, -3 * 5.37], [0, 3.5, -2 * 5.37], [0, 3.5, -1 * 5.37], [0, 3.5, 0], [0, 3.5, 5.37], [0, 3.5, 2 * 5.37], [0, 3.5, 3 * 5.37]];
    var camera02pos = [[-6, 1.5, -3.5 * 5.37], [-6, 1.5, -2.5 * 5.37], [-6, 1.5, -1.5 * 5.37], [-6, 1.5, -0.5 * 5.37], [-6, 1.5, 0.5 * 5.37], [6, 1.5, 1.5 * 5.37], [6, 1.5, 2.5 * 5.37], [6, 1.5, 3.5 * 5.37]];
    var camera03pos = [[39.8, 4.5,18.8],[-39.8, 4.5, -18.8]];
    // 相机id
    var camera01id = [];
    var camera02id = [];
    var camera03id = [];
    // 车道指示器位置
    var li01_pos = [[0,5.8,2.5],[0,5.8,-2.5],[0,6.3,-8],[0,6.2,-13.5],[0,7,-20]];
    var li02_pos = [[0,6.3,8],[0,6.2,13.5],[0,7,20]];
    //
    var land01pos = [[0,0,-43.8],[101.6,0,-43.8],[-101.6,0,-43.8]];
    var land02pos = [[-8,0,43],[93.6,0,43],[-109.6,0,43]];
    this.init = function () {

        gate = new LoadedComp(container);
        gate.setImageUrl('res/textures/RGB.png');
        gate.setObjUrl('res/models/Toll_zhuozhou_south.obj');
        gate.setWireframe(false);
        gate.setMatColor(0x666666);
        gate.createMesh();

        gatename = new LoadedComp(container);
        gatename.setObjUrl('res/models/Toll_zhuozhou_south_name.obj');
        gatename.setMatColor(0x880000);
        gatename.createMesh();

        road = new LoadedComp(container);
        road.setObjUrl('res/models/Toll_zhuozhou_south_road.obj');
        road.setImageUrl('res/textures/Toll_zhuozhou_south_road.png');
        road.createMesh();

        road = new LoadedComp(container);
        road.setObjUrl('res/models/Toll_zhuozhou_south_road.obj');
        road.setImageUrl('res/textures/Toll_zhuozhou_south_road_extension.png');
        road.setPos([100,0,0]);
        road.createMesh();

        road = new LoadedComp(container);
        road.setObjUrl('res/models/Toll_zhuozhou_south_road.obj');
        road.setImageUrl('res/textures/Toll_zhuozhou_south_road_extension.png');
        road.setPos([-100,0,0]);
        road.createMesh();

        //pos of lane instructors
        for (var i = 0; i < li01_pos.length; i++) {

            tempobj = new LoadedComp(container);
            tempobj.setObjUrl('res/models/Lane_instructor.obj');
            tempobj.setImageUrl('res/textures/lane_instr_arrow.png');
            tempobj.setPos(li01_pos[i]);
            tempobj.createMesh();
        }
        for (i = 0; i < li02_pos.length; i++) {

            tempobj = new LoadedComp(container);
            tempobj.setObjUrl('res/models/Lane_instructor.obj');
            tempobj.setImageUrl('res/textures/lane_instr_arrow.png');
            tempobj.setPos(li02_pos[i]);
            tempobj.setOri(0,Math.PI,0);
            tempobj.createMesh();
        }
        //pos of cameras
        for (i = 0; i < camera01pos.length; i++) {

            tempobj = new LoadedComp(container);
            tempobj.setTextureUrl("res/textures/security-camera-icon.png");
            tempobj.setPickAble(true);
            tempobj.setIconSize(1.5);
            tempobj.setName('camera01' + ':' + i);
            tempobj.setPos(camera01pos[i]);
            tempobj.createSprite();
        }
        for (i = 0; i < camera02pos.length; i++) {

            tempobj = new LoadedComp(container);
            tempobj.setTextureUrl("res/textures/security-camera-icon02.png");
            tempobj.setPickAble(true);
            tempobj.setIconSize(2);
            tempobj.setName('camera02' + ':' + i);
            tempobj.setPos(camera02pos[i]);
            tempobj.createSprite();
        }
        for (i = 0; i < camera03pos.length; i++) {

            tempobj = new LoadedComp(container);
            tempobj.setTextureUrl("res/textures/security-camera-icon.png");
            tempobj.setPickAble(true);
            tempobj.setIconSize(1);
            tempobj.setName('camera03' + ':' + i);
            tempobj.setPos(camera03pos[i]);
            tempobj.createSprite();
        }
        //
        for (i = 0; i < land01pos.length; i++) {

            tempobj = new LoadedComp(container);
            tempobj.setObjUrl('res/models/land.obj');
            //tempobj.setImageUrl('res/textures/lane_instr_arrow.png');
            tempobj.setWireframe(true);
            tempobj.setPos(land01pos[i]);
            tempobj.createMesh();
        }
        for (i = 0; i < land02pos.length; i++) {

            tempobj = new LoadedComp(container);
            tempobj.setObjUrl('res/models/land.obj');
            //tempobj.setImageUrl('res/textures/lane_instr_arrow.png');
            tempobj.setWireframe(true);
            tempobj.setPos(land02pos[i]);
            tempobj.setOri(0,Math.PI,0);
            tempobj.createMesh();
        }
    }
};