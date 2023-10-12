import * as THREE from 'three';

export class NeonObject {
  constructor(geometry, filamentColor, haloColor, thickness = 0.02) {
    this.group = new THREE.Group();

    // Material para el filamento y el halo
    const filamentMaterial = new THREE.MeshBasicMaterial({ color: filamentColor });
    const haloMaterial = new THREE.MeshBasicMaterial({ color: haloColor, transparent: true, opacity: 0.5 });

    // Obtener aristas y añadir tubos
    const edges = new THREE.EdgesGeometry(geometry);
    const edgePositions = edges.attributes.position.array;

    for (let i = 0; i < edgePositions.length; i += 6) {
      const start = new THREE.Vector3(edgePositions[i], edgePositions[i + 1], edgePositions[i + 2]);
      const end = new THREE.Vector3(edgePositions[i + 3], edgePositions[i + 4], edgePositions[i + 5]);
      const path = new THREE.LineCurve3(start, end);

      // Tubo para el filamento
      const filamentTube = new THREE.TubeGeometry(path, 1, thickness, 8, false);
      const filamentMesh = new THREE.Mesh(filamentTube, filamentMaterial);
      this.group.add(filamentMesh);

      // Tubo para el halo
      const haloTube = new THREE.TubeGeometry(path, 1, thickness * 1.5, 8, false);
      const haloMesh = new THREE.Mesh(haloTube, haloMaterial);
      this.group.add(haloMesh);
    }
  }

  // Método para obtener el grupo
  getGroup() {
    return this.group;
  }
}
