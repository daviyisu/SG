import * as THREE from '../libs/three.module.js'

class Ejer3 extends THREE.Object3D {
  constructor() { 
    super();
    var texture = new THREE.TextureLoader().load('../imgs/clay.jpg');
    var material = new THREE.MeshPhongMaterial ({map: texture});
    material.side = THREE.DoubleSide;
    var points = [];
    points.push(new THREE.Vector3(Math.sin(0), -10, 0));
    for(let i = 0; i < 10; i++) {
      points.push(new THREE.Vector3(Math.sin(i*0.2)*10+5,(i-5)*2,0));
    }
    var latheobject = new THREE.Mesh(new THREE.LatheGeometry(points),material);
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices = points;
    var line = new THREE.Line(lineGeometry, material);
    this.add(latheobject);
    latheobject.position.x = -20;
    

    this.add(line);
  }

  update() {
    
  }


}

export { Ejer3 };