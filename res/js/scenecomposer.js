/**
 * Created by yxxy6 on 5/25/2017.
 */
SceneComposer = function (c) {
    $.getJSON("res/json/Zhuozhou_south.json", function (data) {

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
function onDocumentClick(event) {
    event.preventDefault();
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(clickobj, true);

    if (intersects.length > 0) {
        //TODO：implement functions while double clicking on objects 双击图标实现功能
        alert(INTERSECTED.parent.idnum);
        // window.open("http://localhost:63342/TollFramework/index.html");
    }
}