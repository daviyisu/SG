import * as THREE from '../libs/three.module.js'

class Nave extends THREE.Object3D {
    constructor() {
      super();

      var geom = new THREE.ConeGeometry(1,5,4);
      var texture = new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
      var material = new THREE.MeshPhongMaterial({map: texture});
      this.figura = new THREE.Mesh(geom,material);
      this.figura.rotation.set(Math.PI/2,0,0);
      this.add(this.figura);
    }
}

export { Nave };