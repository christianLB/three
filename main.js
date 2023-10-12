import * as THREE from 'three'
import { NeonObject } from '../three/utils/utils'
import { setupCameraControls } from './utils/setupCameraControls';
import { InfiniteFloor } from './components/InfiniteFloor'
import { NeonFloor } from './components/NeonFloor'

// Setup básico: escena, cámara, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const updateCamera = setupCameraControls(camera);

// Primer cubo
const neonCube1 = new NeonObject(new THREE.BoxGeometry(1, 1, 1), 0xffffff, 0x00ff00);
neonCube1.getGroup().position.set(0, 2, 2); // Posición del primer cubo
scene.add(neonCube1.getGroup());

// Segundo cubo
const neonCube2 = new NeonObject(new THREE.BoxGeometry(0.5, 0.5, 0.5), 0xffffff, 0x00ff00);
neonCube2.getGroup().position.set(1.5, 2, 2); // Posición del segundo cubo
scene.add(neonCube2.getGroup());

const neonSphere = new NeonObject(new THREE.SphereGeometry(1, 32, 32), 0xffffff, 0x00ff00, 0.005);
neonSphere.getGroup().position.set(3.5, 2, 2); // Posición del segundo cubo
scene.add(neonSphere.getGroup());

// Función para rotar y posicionar la pirámide
const setupPyramid = (pyramid) => {
  const group = pyramid.getGroup();
  group.rotation.x = Math.PI / 2 + Math.PI / 2;
  group.rotation.z = Math.PI / 2 + Math.PI / 2;  // 90 grados en total alrededor del eje Z
};

// Gran Pirámide de Giza (Keops)
const pyramid1 = new NeonObject(new THREE.ConeGeometry(1, 1, 4), 0xffffff, 0x00ff00, 0.008);
setupPyramid(pyramid1);
pyramid1.getGroup().position.set(1, 0.53, 1);
scene.add(pyramid1.getGroup());

// Pirámide de Kefrén
const pyramid2 = new NeonObject(new THREE.ConeGeometry(0.8, 0.8, 4), 0xffffff, 0x00ff00);
setupPyramid(pyramid2);
pyramid2.getGroup().position.set(3, 0.44, 3);
scene.add(pyramid2.getGroup());

// Pirámide de Micerino
const pyramid3 = new NeonObject(new THREE.ConeGeometry(0.6, 0.6, 4), 0xffffff, 0x00ff00);
setupPyramid(pyramid3);
pyramid3.getGroup().position.set(5, 0.35, 5);
scene.add(pyramid3.getGroup());

// //infinite floor
// const floor = new InfiniteFloor(1000, '/images/pattern.jpg');
// scene.add(floor.getMesh());

const neonFloor = new NeonFloor(1000, 1000, 0xffffff, 0x00ff00, 0.004);
scene.add(neonFloor.getGroup());


// Loop de animación
const animate = function () {
  requestAnimationFrame(animate);
  updateCamera();
  neonCube1.getGroup().rotation.x += 0.01;
  neonCube1.getGroup().rotation.y += 0.01;
  neonCube2.getGroup().rotation.x -= 0.01;  // Rotación diferente para el segundo cubo
  neonCube2.getGroup().rotation.y -= 0.01;
  renderer.render(scene, camera);
};

// Posicionar cámara
camera.position.z = 5;
camera.position.y = 5

animate();
