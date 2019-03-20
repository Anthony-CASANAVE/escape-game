var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

//Updating size on rotate (For mobile) and on resize.
window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var weight = window.innerHeight;
    renderer.setSize( width, weight );
    camera.aspect = width / weight;
    camera.updateProjectionMatrix();
});

document.getElementById('webgl').appendChild(renderer.domElement);

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
};

animate();

camera.position.z = 50;
camera.rotation.z = 180 * Math.PI / 180;

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

controls.update();

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 0.2);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.15);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 0.2);
backLight.position.set(100, 0, -100).normalize();

var ambiantLight = new THREE.AmbientLight(0xaaaaaa);

scene.add(ambiantLight);
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);


var mesh = null;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "models/" );
mtlLoader.load( 'FullSceneBigOpti1.mtl', function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( "models/" );
    objLoader.load( 'FullSceneBigOpti1.obj', function ( object ) {

        mesh = object;
        object.scale.x = object.scale.y = object.scale.z = 0.02;
        scene.add( mesh );

    } );

} );