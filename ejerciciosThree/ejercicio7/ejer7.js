import * as THREE from '../libs/three.module.js'


class Ejer7 extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    this.createGUI(gui, titleGui);
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
    var parteExtensible = new THREE.Object3D();

    var cajaPequenia1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1, 0.5), this.material);
    var cajaPequenia2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1, 0.5), this.material);
    var cajaGrande = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 0.5), this.material2);
    cajaGrande.position.y = -1.5;
    cajaPequenia2.position.y = -3, 5;

    // IMPORTANTE: Con independencia del orden en el que se escriban las 2 líneas siguientes, SIEMPRE se aplica primero la rotación y después la traslación. Prueba a intercambiar las dos líneas siguientes y verás que no se produce ningún cambio al ejecutar.    
    penduloPrincipal.rotation.z = this.guiControls.rotacion;


    penduloPrincipal.add(cajaPequenia1);
    parteExtensible.add(cajaGrande);
    parteExtensible.add(cajaPequenia2);
    penduloPrincipal.add(parteExtensible);


    return penduloPrincipal;
  }

  createGUI(gui, titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = new function () {
      this.rotacion = 0;
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    folder.add(this.guiControls, 'rotacion', -0.1, 0.125, 0.001).name('Rotación : ');
  }


  update() {
    this.penduloGrande.rotation.z = this.guiControls.rotacion;
  }


}

export { Ejer7 };