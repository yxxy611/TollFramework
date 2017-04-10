/**
 * Created by yxxy6 on 2017/4/11.
 */
// Initialize scene

function start() {

    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    // var width = 800;
    // var height = 600;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xaaaaaa);
    document.body.appendChild(renderer.domElement);
    //camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 15;
    // camera.up = new THREE.Vector3(0, 0, 1);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 10;
    controls.maxDistance = 7500;

    this.render = function () {

        requestAnimationFrame(render);
        renderer.render(scene, camera);

    };
    // // Initialize workspace designer
    // var workspaceDesigner = new WorkspaceDesigner(scene, renderer);
    //
    // function initRRCrane() {
    //
    //     workspaceDesigner.addLink(new Kinematic.Link(0, 0, 2));
    //
    //     var j1 = new Kinematic.Link(0, 0, 3);
    //     workspaceDesigner.addLink(j1);
    //
    //     var j2 = new Kinematic.Link(0, 7, 0);
    //     j2.rotate(0, Math.PI / 2, 0);
    //     workspaceDesigner.addLink(j2);
    //
    //     var j3 = new Kinematic.Link(0, 3, 0);
    //     j3.rotate(0, 0, Math.PI);
    //     workspaceDesigner.addLink(j3);
    //
    //     workspaceDesigner.addLimit(
    //         new Crane.RotationLimit(j1, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 2*Math.PI))
    //     );
    //
    //     workspaceDesigner.addLimit(
    //         new Crane.RotationLimit(j2, new THREE.Vector3(0.1, 0, 0), new THREE.Vector3(1, 0, 0))
    //     );
    //
    //     workspaceDesigner.addLimit(
    //         new Crane.RotationLimit(j3, new THREE.Vector3(0, 0, 0.4), new THREE.Vector3(0, 0, 1.5))
    //     );
    //
    //     workspaceDesigner.updateLinksMesh();
    //     workspaceDesigner.updateLimitMeshes();
    //     workspaceDesigner.updateWorkspaceMesh();
    //
    // }
    //
    // initRRCrane();

    render();

}

window.onload = start;
