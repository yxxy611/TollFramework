/**
 * Created by yxxy6 on 5/25/2017.
 */
SceneComposer = function (c,ju) {
    $.getJSON(ju, function (data) {
        var tempObj, foo;
        for (var i = 0; i < data.meshes.length; i++) {
            foo = data.meshes[i];
            tempObj = new LoadedComp(c);
            tempObj.setName(foo.name);
            tempObj.setImageUrl(foo.imageUrl);
            tempObj.setObjUrl(foo.url);
            tempObj.setPos(foo.position);
            tempObj.setOri(foo.orientation);
            tempObj.setPickAble(foo.interactive);
            tempObj.createMesh();
        }
        for (i = 0; i < data.icons.length; i++) {
            foo = data.icons[i];
            tempObj = new LoadedComp(c);
            tempObj.setName(foo.name);
            tempObj.setTextureUrl(foo.imageUrl);
            tempObj.setIconSize(foo.size);
            tempObj.setPos(foo.position);
            tempObj.setPickAble(foo.interactive);
            tempObj.createSprite();
        }
    });
};

function doubleClick(INTERSECTED) {
    //TODO：implement functions while double clicking on objects 双击图标实现功能
    //INTERSECTED is the object
    alert(INTERSECTED.parent.idnum);
    //window.open("http://localhost:63342/TollFramework/index.html");
}