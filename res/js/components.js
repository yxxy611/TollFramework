/**
 * @param {Array} container
 * @constructor
 */
LoadedComp = function (container) {

    THREE.Object3D.call(this);

    var obj = this;
    var position = new THREE.Vector3(0, 0, 0);
    var orientation = new THREE.Vector3(0, 0, 0);
    var scene = container[0];
    var imageloader = container[1];
    var textureloader = container[2]
    var objloader = container[3];
    var clickobj = container[4];
    var texture = new THREE.Texture();
    var imageurl, objurl, textureurl;
    var interactive = false;
    var wireframe = false;
    var hexcolor =0xffffff;
    var mapsprite, materialsprite;
    var mat = new THREE.MeshStandardMaterial({opacity: 1,
        transparent: true,side: THREE.FrontSide,metalness:0,roughness:1 });
    var wireframemat,normalmat;
    var iconscale = 1;
    this.idnum = 'unknown';

    this.createSprite = function () {
        mapsprite = textureloader.load(textureurl);
        materialsprite = new THREE.SpriteMaterial({map: mapsprite, color: 0xffffff, fog: false});
        var sprite = new THREE.Sprite(materialsprite);
        sprite.scale.set(iconscale,iconscale,iconscale);
        obj.position.set(position.x,position.y,position.z) ;
        obj.add(sprite);
        scene.add(obj);
        clickobj.push(sprite);
    };
    this.createMesh = function () {
        imageloader.load(imageurl, function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });
        objloader.load(objurl, function (o) {
            for (var i = 0, l = o.children.length; i < l; i++) {
                if (wireframe) {
                    wireframemat = new THREE.MeshBasicMaterial({wireframe: true,color:hexcolor});
                    o.children[0].material = wireframemat;
                }
                else {
                    if (imageurl) {
                        // mat = new THREE.MeshStandardMaterial({opacity: 1,
                        //     transparent: true,map:texture,side: THREE.FrontSide,metalness:0,roughness:1 });
                        mat.map = texture;
                        o.children[0].material = mat;
                    }
                    else {
                        normalmat = new THREE.MeshPhongMaterial({side: THREE.FrontSide,color:hexcolor });
                        o.children[0].material = normalmat;
                    }

                }
                o.children[0].castShadow = true;
                //o.children[0].receiveShadow = true;
                obj.add(o.children[0]);
            }
            obj.position.set(position.x,position.y,position.z) ;
            obj.rotateX(orientation.x);
            obj.rotateY(orientation.y);
            obj.rotateZ(orientation.z);

            if (interactive) {
                clickobj.push(obj);
            }
            scene.add(obj);
        }, onProgress, onError);
    };
    this.setIconSize = function(a)
    {
        iconscale = a;
    };
    this.setPos = function (array) {
        //console.log(this.name + ':' + 'set pos' + '(' + array[0] + ',' + array[1] + ',' + array[2] + ')');
        position.x = array[0];
        position.y = array[1];
        position.z = array[2];
    };
    this.setOri = function (a, b, c) {
        orientation.x = a;
        orientation.y = b;
        orientation.z = c;
    };
    this.setPickAble = function (boolean) {
        interactive = boolean;
    };
    this.setImageUrl = function (url) {
        imageurl = url;
    };
    this.setTextureUrl = function (url) {
        textureurl = url;
    };
    this.setObjUrl = function (url) {
        objurl = url;
    };
    this.setWireframe = function (boolean) {
        wireframe = boolean;
    };
    this.setName = function (string) {
        this.idnum = string;
    };
    this.setMat = function(m){
        mat = m;

    };
    this.setMatColor = function (hex) {
        hexcolor = hex;
    }
};

LoadedComp.prototype = Object.create(THREE.Object3D.prototype);

/**
 * @param {THREE.Scene} scene
 * @param {THREE.ImageLoader} imageloader
 * @param {THREE.OBJLoader} objloader
 * @patam {THREE.TextureLoader} textureloader
 * @param {Array} clickobj
 * @constructor
 */
SceneContainer = function (scene, imageloader, textureloader, objloader, clickobj) {
    var container = [];
    container.push(scene, imageloader, textureloader, objloader, clickobj);
    return container;
};

onProgress = function (xhr) {
    // if (xhr.lengthComputable) {
    //     var percentComplete = xhr.loaded / xhr.total * 100;
    //     console.log(Math.round(percentComplete, 2) + '% downloaded');
    // }
};
onError = function (xhr) {
};