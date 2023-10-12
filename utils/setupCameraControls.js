// cameraControls.js

import * as THREE from 'three';

export function setupCameraControls(camera, moveSpeed = 0.1, rotationSpeed = 0.05) {
  let cameraDirection = new THREE.Vector3(0, 0, -1);
  let lateralDirection = new THREE.Vector3(1, 0, 0);
  let backwardDirection = new THREE.Vector3(0, 0, 1);
  let keys = { w: false, s: false, a: false, d: false, up: false, down: false, left: false, right: false };


  document.addEventListener("keydown", function (event) {
    switch (event.code) {
      case 'KeyW':
        keys.w = true;
        break;
      case 'ArrowUp':
        keys.up = true;
        break;
      case 'ArrowDown':
        keys.down = true;
        break;
      case 'ArrowLeft':
        keys.left = true;
        break;
      case 'ArrowRight':
        keys.right = true;
        break;
      case 'KeyS':
        keys.s = true;
        break;
      case 'KeyA':
        keys.a = true;
        break;
      case 'KeyD':
        keys.d = true;
        break;
    }
  });

  document.addEventListener("keyup", function (event) {
    switch (event.code) {
      case 'KeyW':
        keys.w = false;
        break;
      case 'ArrowUp':
        keys.up = false;
        break;
      case 'ArrowDown':
        keys.down = false;
        break;
      case 'ArrowLeft':
        keys.left = false;
        break;
      case 'ArrowRight':
        keys.right = false;
        break;
      case 'KeyS':
        keys.s = false;
        break;
      case 'KeyA':
        keys.a = false;
        break;
      case 'KeyD':
        keys.d = false;
        break;
    }
  });

  // Función para actualizar la cámara en el loop de animación
  const update = () => {
    if (keys.w) {
      camera.position.add(cameraDirection.clone().multiplyScalar(moveSpeed));
    }
    if (keys.s) {
      camera.position.add(backwardDirection.clone().multiplyScalar(moveSpeed));
    }
    if (keys.a) {
      camera.position.add(lateralDirection.clone().multiplyScalar(-moveSpeed)); // Negativo para ir a la izquierda
    }
    if (keys.d) {
      camera.position.add(lateralDirection.clone().multiplyScalar(moveSpeed));
    }
    if (keys.up) {
      cameraDirection.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotationSpeed);
    }
    if (keys.down) {
      cameraDirection.applyAxisAngle(new THREE.Vector3(1, 0, 0), -rotationSpeed);
    }
    if (keys.left) {
      cameraDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationSpeed);
    }
    if (keys.right) {
      cameraDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), -rotationSpeed);
    }
    camera.lookAt(camera.position.clone().add(cameraDirection));
  };

  return update;
}
