import * as THREE from 'three';

export class NeonFloor {
  constructor(size, divisions, filamentColor, haloColor, thickness = 0.02) {
    this.group = new THREE.Group();

    // Material para el filamento y el halo
    const filamentMaterial = new THREE.MeshBasicMaterial({ color: filamentColor });
    const haloMaterial = new THREE.MeshBasicMaterial({ color: haloColor, transparent: true, opacity: 0.5 });

    const step = size / divisions;

    // Crear líneas horizontales y verticales
    for (let i = -size / 2; i <= size / 2; i += step) {
      // Líneas horizontales
      const hStart = new THREE.Vector3(-size / 2, 0, i);
      const hEnd = new THREE.Vector3(size / 2, 0, i);
      const hPath = new THREE.LineCurve3(hStart, hEnd);

      // Líneas verticales
      const vStart = new THREE.Vector3(i, 0, -size / 2);
      const vEnd = new THREE.Vector3(i, 0, size / 2);
      const vPath = new THREE.LineCurve3(vStart, vEnd);

      // Crear tubos para cada línea
      [hPath, vPath].forEach((path) => {
        const filamentTube = new THREE.TubeGeometry(path, 1, thickness, 8, false);
        const filamentMesh = new THREE.Mesh(filamentTube, filamentMaterial);
        this.group.add(filamentMesh);

        const haloTube = new THREE.TubeGeometry(path, 1, thickness * 1.5, 8, false);
        const haloMesh = new THREE.Mesh(haloTube, haloMaterial);
        this.group.add(haloMesh);
      });
    }
  }

  // Método para obtener el grupo
  getGroup() {
    return this.group;
  }
}
