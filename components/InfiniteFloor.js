import * as THREE from 'three';

export class InfiniteFloor {
  constructor(size, texturePath) {
    // Crear la textura
    const texture = new THREE.TextureLoader().load(texturePath);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50, 50);  // Repetir la textura

    // Crear el material
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Crear el plano
    this.geometry = new THREE.PlaneGeometry(size, size);
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.rotation.x = - Math.PI / 2;
  }

  // Método para obtener el mesh
  getMesh() {
    return this.mesh;
  }
}
