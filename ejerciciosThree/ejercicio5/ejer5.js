import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
class Ejer5 extends THREE.Object3D {
  constructor() {
    super();
    var material = new THREE.MeshPhongMaterial({ color: 0xff2d00  });

    const cilindro = new THREE.CylinderGeometry(3,3,5);
    var cilindrobsp = new ThreeBSP (cilindro);

    const cilindroInterior = new THREE.CylinderGeometry(2.8,2.8,4.8);
    cilindroInterior.translate(0,0.2,0);
    var cilindroInteriorbsp = new ThreeBSP (cilindroInterior);

    const asa = new THREE.TorusGeometry(1.5,0.3);
    asa.translate(-3,0,0);
    var asabsp = new ThreeBSP (asa);

    const cajaAux = new THREE.BoxGeometry(2.8,4,3);
    cajaAux.translate(-1.5,0,0);
    var cajaAuxbsp = new ThreeBSP (cajaAux);
   
 
    var asafinal = asabsp.subtract(cajaAuxbsp);
    var resultParcial = cilindrobsp.subtract(cilindroInteriorbsp);
    var result = resultParcial.union(asafinal);
    var taza = result.toGeometry();
    var buffertaza = new THREE.BufferGeometry().fromGeometry(taza);
    this.final = new THREE.Mesh(buffertaza, material);
    this.add(this.final);
    
    
       
    

   
  }

  update() {
      this.final.rotation.y += 0.02;
  }


}

export { Ejer5 };