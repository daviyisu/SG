import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
class Ejer5 extends THREE.Object3D {
  constructor() {
    super();
    var material = new THREE.MeshPhongMaterial({ color: 0xff2d00  });
    const esfera1 = new THREE.SphereGeometry(3);
    const esfera2 = new THREE.SphereGeometry(3);
    esfera1.translate(1,0);
    esfera2.translate(-1,0);
    var esfera1bsp = new ThreeBSP (esfera1);
    var esfera2bsp = new ThreeBSP (esfera2);

    var result = esfera1bsp.union(esfera2bsp);
    var geometry = result.toGeometry();
    var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
    this.final = new THREE.Mesh(bufferGeometry, material);
    this.add(this.final);
    
    
       
    

   
  }

  update() {
    
  }


}

export { Ejer5 };