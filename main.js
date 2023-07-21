import './style.css'
import * as THREE from 'three';
//controls making scrolling down move the camera


//importing textures and normal Maps
import earthTexture from './Img/earth.jpg';
import earthNormal from './Img/earthNormal.jpg';
import venusTexture from './Img/venus.jpg';
import venusNormal from './Img/venusNormal.jpg';
import moonTexture from './Img/moon.jpg';
import moonNormal from './Img/moonNormal.jpg';
import sunTexture from './Img/sun.jpg';
import sunNormal from './Img/sunNormal.jpg';
import mercuryTexture from './Img/mercury.jpg';
import mercuryNormal from './Img/mercuryNormal.jpg';

//setting up the camera for the black backround
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
canvas: document.querySelector('#bg'),
});

//setting camera to screen??
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render( scene, camera );

//adding lights
const pointLight = new THREE.AmbientLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);

//adding planet textures
const TextureLoader = new THREE.TextureLoader();

//adding sun
const sunGeo = new THREE.SphereGeometry(15, 250, 250);
const sunMesh = new THREE.MeshBasicMaterial({
    map: TextureLoader.load(sunTexture),
    normalMap: TextureLoader.load(sunNormal)
});
const sun = new THREE.Mesh(sunGeo, sunMesh);
scene.add(sun);
sun.position.y = -25;

//adding mercury
const mercuryGeo = new THREE.SphereGeometry(2, 150, 150);
const mercuryMesh = new THREE.MeshBasicMaterial({
    map: TextureLoader.load(mercuryTexture),
    normalMap: TextureLoader.load(mercuryNormal)
});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMesh);
// sun.add(mercury);
const mercuryObj = new THREE.Object3D();
mercuryObj.add(mercury);
scene.add(mercuryObj);
mercury.position.x = 22;

//adding venus
const venusGeo = new THREE.SphereGeometry(4, 150, 150);
const venusMesh = new THREE.MeshBasicMaterial({
    map: TextureLoader.load(venusTexture),
    normalMap: TextureLoader.load(venusNormal)
});
const venus = new THREE.Mesh(venusGeo, venusMesh);
sun.add(venus);
venus.position.x = 33;
   

//adding stars generated randomly
function addStar() {
    const geometry = new THREE.SphereGeometry(0.55, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xf0b3ff })
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 2000 ) );
    star.position.set(x,y,z);
    scene.add(star)

}
Array(2200).fill().forEach(addStar)

function animate() {
    requestAnimationFrame(animate);
    mercury.rotation.y += 0.0026
    mercury.rotation.x += 0.0001
    mercury.rotation.z += 0.0001
    sun.rotation.y += 0.0004
    sun.rotation.x += 0.0004
    sun.rotation.z += 0.0007
    

    renderer.render( scene, camera );
}


// const spaceTexture = new THREE.TextureLoader().load('backround')
// scene.background = spaceTexture

// Adding sun texture with noraml map to add depth texture
// const sunTexture = new THREE.TextureLoader().load('Sun.jpg');
// const normalSunTexture = new THREE.TextureLoader().load('normalSun.jpg');

// const sun = new THREE.Mesh(
//     new THREE.SphereGeometry(3, 32, 32),
//     new THREE.MeshStandardMaterial( {
//         map: sunTexture,
//         normalMap: normalSunTexture
//     })
// );

// scene.add(sun);



animate()