import * as THREE from '../libs/three.module.js'


class Ejer7 extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    //this.createGUI(gui, titleGui);
    this.material = new THREE.MeshPhongMaterial({ color: 0xCF0000 });
    this.material2 = new THREE.MeshPhongMaterial({ color: 0xCF4000 });


    this.penduloGrande = this.createPenduloGrande();
    //this.penduloSecundario = this.createPenduloSecundario();
    this.add(this.penduloGrande);
    //this.add(this.penduloSecundario);

  }

  createPenduloGrande() {
    // El nodo
    var penduloPrincipal = new THREE.Object3D();
    
    var cajaPequenia1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1, 0.5), this.material);
    var cajaPequenia2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1, 0.5), this.material);
    var cajaGrande = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 0.5), this.material2);
    cajaGrande.position.y = -1.5;
    cajaPequenia2.position.y = -3,5;
    penduloPrincipal.add(cajaPequenia1);
    penduloPrincipal.add(cajaGrande);
    penduloPrincipal.add(cajaPequenia2);
    return penduloPrincipal;
  }


  update() {

  }


}

export { Ejer7 };