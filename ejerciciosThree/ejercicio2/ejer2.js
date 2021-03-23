import * as THREE from '../libs/three.module.js'

class Ejer2 extends THREE.Object3D {
  constructor() { // sería constructor(gui, titleGui) pero como no voy a hacerlo interactivo no tiene parámetros.
    super();
    //this.createGUI(gui, titleGui);
    this.createBox();
    this.createCone();
    this.createCylinder();
    this.createSphere();
    this.createTorus();
  }

  createBox() {
    var texture = new THREE.TextureLoader().load('../imgs/ladrillo-bump.png');
    var materialBox = new THREE.MeshPhongMaterial ({map: texture});
    var boxGeom = new THREE.BoxGeometry(1, 2, 2);
    this.box = new THREE.Mesh(boxGeom, materialBox);
    this.add(this.box);
    this.box.position.y = 5;
  }

  createCone() {
    var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg');
    var materialCone = new THREE.MeshPhongMaterial ({map: texture});
    var coneGeom = new THREE.ConeGeometry(2, 3);
    this.cone = new THREE.Mesh(coneGeom, materialCone);
    this.add(this.cone);
    this.cone.position.y = 5;
    this.cone.position.x = 8;
  }

  createCylinder() {
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialCylinder = new THREE.MeshPhongMaterial ({map: texture});
    var cylGeom = new THREE.CylinderGeometry(3, 1.5, 3);
    this.cylinder = new THREE.Mesh(cylGeom, materialCylinder);
    this.add(this.cylinder);
    this.cylinder.position.y = 5;
    this.cylinder.position.x = -8;
  }

  createSphere() {
    var texture = new THREE.TextureLoader().load('../imgs/tierra.jpg');
    var materialSphere = new THREE.MeshPhongMaterial ({map: texture});
    var sphereGeom = new THREE.SphereGeometry(3, 20, 20);
    this.sphere = new THREE.Mesh(sphereGeom, materialSphere);
    this.add(this.sphere);
    this.sphere.position.y = 5;
    this.sphere.position.z = -9;
  }

  createTorus() {
    var texture = new THREE.TextureLoader().load('../imgs/ladrillo-mapaNormal.png');
    var torusMat = new THREE.MeshPhongMaterial ({map: texture});
    var torusGeom = new THREE.TorusGeometry(1, 0.3, 10, 20);
    this.torus = new THREE.Mesh(torusGeom, torusMat);
    this.add(this.torus);
    this.torus.position.y = 5;
    this.torus.position.z = 9;
  }

  //Esto está comentado porque no va a ser interactivo, así que no necesitamos una interfaz.
  /*createGUI(gui, titleGui) { 
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;

      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;

      this.posX = 0.0;
      this.posY = 0.0;
      this.posZ = 0.0;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;

        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;

        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name('Tamaño X : ').listen();
    folder.add(this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name('Tamaño Y : ').listen();
    folder.add(this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name('Tamaño Z : ').listen();

    folder.add(this.guiControls, 'rotX', 0.0, Math.PI / 2, 0.1).name('Rotación X : ').listen();
    folder.add(this.guiControls, 'rotY', 0.0, Math.PI / 2, 0.1).name('Rotación Y : ').listen();
    folder.add(this.guiControls, 'rotZ', 0.0, Math.PI / 2, 0.1).name('Rotación Z : ').listen();

    folder.add(this.guiControls, 'posX', -20.0, 20.0, 0.1).name('Posición X : ').listen();
    folder.add(this.guiControls, 'posY', 0.0, 10.0, 0.1).name('Posición Y : ').listen();
    folder.add(this.guiControls, 'posZ', -20.0, 20.0, 0.1).name('Posición Z : ').listen();

    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }*/

  update() {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    //this.position.set(this.guiControls.posX, this.guiControls.posY, this.guiControls.posZ);
    //this.rotation.set(this.guiControls.rotX, this.guiControls.rotY, this.guiControls.rotZ);
    //this.scale.set(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);
    this.box.rotation.y += 0.01;
    this.box.rotation.x += 0.01;

    this.cone.rotation.y += 0.01;
    this.cone.rotation.x += 0.01;

    this.cylinder.rotation.y += 0.01;
    this.cylinder.rotation.x += 0.01;

    this.sphere.rotation.y += 0.01;
    this.sphere.rotation.x += 0.01;

    this.torus.rotation.y += 0.01;
    this.torus.rotation.x += 0.01;
  }


}

export { Ejer2 };