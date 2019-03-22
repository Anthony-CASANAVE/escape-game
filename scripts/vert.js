var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );


document.getElementById('webgl').appendChild(renderer.domElement);

controls = new THREE.MapControls( camera, renderer.domElement );
controls.enableDamping = false;
controls.dampingFactor = 0.25;
controls.enableRotate = false;
controls.screenSpacePanning = true;
controls.maxDistance = 100;
controls.minDistance = 10;
controls.enableZoom = true;
controls.maxPolarAngle = Math.PI / 2;



scene.fog = new THREE.FogExp2( 0xcccccc, 0.018 );


renderer.physicallyCorrectLights = true;
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 2);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 1);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 2);
backLight.position.set(100, 0, -100).normalize();

const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x202020, 2);


//Building variable for easy tips placing.
var rangY1 = -132;
var rangY2 = -111.08;
var rangY3 = -90.16;
var rangY4 = -69.25;
var rangY5 = -48.33;
var rangY6 = -27.41;
var rangY7 = -6.5;
var rangY8 = 14.41;
var rangY9 = 35.33;
var rangY10 = 56.25;
var rangY11 = 77.16;
var rangY12 = 77.16;


var rangZ1 = -1.3;
var rangZ2 = -2.6;
var rangZ3 = -3.9;
var rangZ4 = -5.2;
var rangZ5 = -6.5;
var rangZ6 = -7.8;
var rangZ7 = -9;
var rangZ8 = -10.3;
var rangZ9 = -11.6;
var rangZ10 = -12.9;
var rangZ11 = -14.2;
var rangZ12 = -14.2;
//Prévoir 38 axes X
var rangX1 = -394.75;
var rangX2 = -384.5;
var rangX3 = -374.25;

var rangX4 = -338.5;
var rangX5 = -328.25;
var rangX6 = -318;
var rangX7 = -307.75;
var rangX8 = -297.5;
var rangX9 = -287.25;
var rangX10 = -277;
var rangX11 = -266.75;
var rangX12 = -256.5;
var rangX13 = -246.25;
var rangX14 = -236;
var rangX15 = -225.75;
var rangX16 = -215.5;
var rangX17 = -205.25;
var rangX18 = -195;
var rangX19 = -184.75;

var rangX20 = -121.5;
var rangX21 = -111.25;
var rangX22 = -101;
var rangX23 = -90.75;
var rangX24 = -80.5;
var rangX25 = -70.25;
var rangX26 = -60;
var rangX27 = -49.75;
var rangX28 = -35.5;
var rangX29 = -29.25;
var rangX30 = -19;
var rangX31 = -8.75;
var rangX32 = 1.5;
var rangX33 = 11.75;
var rangX34 = 22;
var rangX35 = 32.25;

var rangX36 = 68.25;
var rangX37 = 78.5;
var rangX38 = 88.75;

//Ci dessous, importer un mesh en .obj et lui appliquer les coloration basiques du .mtl. Placer tout ce qui est entre ce message et le message de la prochaine importation pour désactiver.


var OBJAmphi = 'models/slicedModels.obj';
var MTLAmphi = 'models/slicedModels.mtl';
var OBJIndBl = 'models/IndiceBleu.obj';
var MTLIndBl = 'models/IndiceBleu.mtl';
var OBJIndJa = 'models/IndiceJaune.obj';
var MTLIndJa = 'models/IndiceJaune.mtl';
var OBJIndRo = 'models/IndiceRouge.obj';
var MTLIndRo = 'models/IndiceRouge.mtl';
var OBJIndVe = 'models/IndiceVert.obj';
var MTLIndVe = 'models/IndiceVert.mtl';
var OBJIndVi = 'models/IndiceViolet.obj';
var MTLIndVi = 'models/IndiceViolet.mtl';


//Importing OBL and MTL to build models

var mtlLoader = new THREE.MTLLoader();

function importThings(objFile, mtlFile, posiX, posiY, posiZ, name){

    mtlLoader.load( mtlFile, function( materials ) {

        materials.preload();
        materials.receiveShadow = true;

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( objFile, function ( name ) {

            name.scale.x = name.scale.y = name.scale.z = 0.02;

            name.position.x = posiX;
            name.position.y = posiY;
            name.position.z = posiZ;
            name.rotateX( Math.PI / 3 );
            name.receiveShadow = true;
            name.castShadow = true;


            scene.add( name );
        } );

    } );

}


function importImmobileThings(objFile, mtlFile, posiX, posiY, posiZ){

    mtlLoader.load( mtlFile, function( materials ) {

        materials.preload();
        materials.receiveShadow = true;

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( objFile, function ( object ) {

            mesh = object;

            object.scale.x = object.scale.y = object.scale.z = 0.02;
            scene.add( mesh );

            mesh.position.x = posiX;
            mesh.position.y = posiY;
            mesh.position.z = posiZ;
            mesh.rotateX( Math.PI / 3 );
            mesh.receiveShadow = true;
        } );

    } );
}



//Updating size on rotate (For mobile) and on resize.
window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var weight = window.innerHeight;
    renderer.setSize( width, weight );
    camera.aspect = width / weight;
    camera.updateProjectionMatrix();
});

camera.position.z = 30;
camera.rotation.set( 0, 0, 0 );

//Spawning lights
scene.add( ambientLight );
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);


//Spawning models
importImmobileThings(OBJAmphi, MTLAmphi, 0, 0, 30);

importThings(OBJIndVe, MTLIndVe, rangX2, rangY11, rangZ11, "indiceVert");
importThings(OBJIndVe, MTLIndVe, rangX7, rangY3, rangZ3, "indiceVert");
importThings(OBJIndVe, MTLIndVe, rangX13, rangY11, rangZ11, "indiceVert");
importThings(OBJIndVe, MTLIndVe, rangX13, rangY5, rangZ5, "indiceVert");
importThings(OBJIndVe, MTLIndVe, rangX17, rangY8, rangZ8, "indiceVert");
importThings(OBJIndVe, MTLIndVe, rangX22, rangY4, rangZ4, "indiceVert");
importThings(OBJIndVe, MTLIndVe, rangX24, rangY8, rangZ8, "indiceVert");
importThings(OBJIndVe, MTLIndVe, rangX29, rangY9, rangZ9, "indiceVert");
importThings(OBJIndVe, MTLIndVe, rangX31, rangY3, rangZ3, "indiceVert");
importThings(OBJIndVe, MTLIndVe, rangX38, rangY10, rangZ10, "indiceVert");




var animate = function () {
    requestAnimationFrame( animate );

    if(camera.position.x > 2000){
        camera.position.x = 0;
        camera.rotation.set( 0, 0, 0 );
        controls.update();

    }

    if(camera.position.x < -2000){
        camera.position.x = 0;
        camera.rotation.set( 0, 0, 0 );
        controls.update();
    }

    if(camera.position.y > 2000){
        camera.position.y = 0;
        camera.rotation.set( 0, 0, 0 );
        controls.update();
    }

    if(camera.position.y < -2000){
        camera.position.y = 0;
        camera.rotation.set( 0, 0, 0 );
        controls.update();
    }
    if(camera.position.z > 100){
        camera.position.z = 25;
        camera.rotation.set( 0, 0, 0 );
        controls.distance = 25;
        controls.update();
    }

    if(camera.position.z < 10){
        camera.position.z = 20;
        camera.rotation.set( 0, 0, 0 );
        controls.distance = 20;
        controls.update();
    }

    camera.rotation.set( 0, 0, 0 );
    controls.update();
    renderer.render(scene, camera);
};



animate();
controls.update();

