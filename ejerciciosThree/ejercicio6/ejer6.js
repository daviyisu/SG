import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Ejer6 extends THREE.Object3D {
  constructor() {
    super();
    var that = this;
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();
    materialLoader.load('../models/porsche911/911.mtl',
      function(materials) {
        objectLoader.setMaterials (materials);
        objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
          function(object) {
            var modelo = object;
            that.add(modelo);
          } , null, null);
          });
      
          
 
  }

  update() {
    this.rotation.y += 0.01;
  }


}

export { Ejer6 };