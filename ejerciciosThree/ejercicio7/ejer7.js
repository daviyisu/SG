import * as THREE from '../libs/three.module.js'


class Ejer7 extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    this.h_original = 5;
    this.h = this.h_original;
    this.a = 0.5;
    this.createGUI(gui, titleGui);
    this.material = new THREE.MeshPhongMaterial({ color: 0xCF0000 });
    this.material2 = new THREE.MeshPhongMaterial({ color: 0x00ffd8 }); 
    this.material3 = new THREE.MeshPhongMaterial({ color: 0x0fff00 });

    




    this.penduloGrande = this.createPenduloGrande();
    this.penduloSecundario = this.createPenduloSecundario();
    this.penduloGrande.add(this.penduloSecundario);
    this.add(this.penduloGrande);
   

  }

  createPenduloGrande() {
    // Los nodos finales a unir
    var penduloPrincipal = new THREE.Object3D();
    this.parteExtensible = new THREE.Object3D();

    //La altura de los cubos pequeños fijos
    this.small_h = 4;

    //Las geometrías de los dos tipos de cajas
    var smallBox = new THREE.BoxGeometry(this.a, this.small_h, this.a);
    var boxGeom = new THREE.BoxGeometry(this.a, this.h, this.a);

    //Esta traslación deja la parte superior en el origen de coordenadas
    boxGeom.translate(0, -this.h / 2, 0);
    //smallBox.translate(0, -this.small_h / 2, 0);

    //Creamos los Mesh
    var cajaPequenia1 = new THREE.Mesh(smallBox, this.material);
    this.cajaPequenia2 = new THREE.Mesh(smallBox, this.material);

    //La posicion de la caja de abajo depende de la altura de las cajas encima suya (y como además la altura de la caja grande varía, lo multiplicamos por escalaSup)
    this.cajaPequenia2.position.y = (-this.small_h) - (this.h * this.guiControls.escalaSup);
    this.cajaGrande = new THREE.Mesh(boxGeom, this.material2);
    this.cajaGrande.position.y = -this.small_h/2;

    //Damos el control de la rotacion y de la escala en y a la GUI
    penduloPrincipal.rotation.z = this.guiControls.rotacion;
    this.cajaGrande.scale.y = this.guiControls.escalaSup;


    //Se añaden los nodos a la figura
    penduloPrincipal.add(cajaPequenia1);
    this.parteExtensible.add(this.cajaGrande);
    this.parteExtensible.add(this.cajaPequenia2);
    penduloPrincipal.add(this.parteExtensible);


    //Se devuelve la figura
    return penduloPrincipal;
  }

  createPenduloSecundario(){
    var penduloReturn = new THREE.Object3D();
    this.h_secundario = 2.5;
    var geoSecundaria = new THREE.BoxGeometry(this.a, this.h_secundario, this.a);
    geoSecundaria.translate(0, -this.h_secundario/2,0);
    this.cajaSecundaria = new THREE.Mesh(geoSecundaria, this.material3);
    this.cajaSecundaria.rotation.z = this.guiControls.rotacion2;
    this.cajaSecundaria.position.y = (  -( this.small_h/2) - ( 0.1 * this.h ) ) - this.guiControls.movSecundario;
    this.cajaSecundaria.scale.y = this.guiControls.escalaInf;
    this.cajaSecundaria.position.z = this.a; 
    
    penduloReturn.add(this.cajaSecundaria);
    return penduloReturn;
  }

  createGUI(gui, titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = new function () {
      this.rotacion = 0;
      this.escalaSup = 1;
      this.movSecundario = 0;
      this.rotacion2 = 0;
      this.escalaInf = 1;
      

      this.reset = function () {
        this.rotacion = 0;
        this.escalaSup = 1;
        this.movSecundario = 0;
        this.rotacion2 = 0;
        this.escalaInf = 1;
       
      }
    }



    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    var amplitud_giro = THREE.MathUtils.degToRad(45);
    folder.add(this.guiControls, 'rotacion', -amplitud_giro, amplitud_giro, 0.001).name('Rotación sup. : ').listen();
    folder.add(this.guiControls, 'escalaSup', 1, 2, 0.001).name('Escalado : ').listen();
    folder.add(this.guiControls, 'movSecundario', 0, this.h*0.9, 0.001).name('Movimiento secundario : ').listen();
    folder.add(this.guiControls, 'rotacion2', -amplitud_giro, amplitud_giro, 0.001).name('Rotación inf.. : ').listen();
    folder.add(this.guiControls, 'escalaInf', 1, 2, 0.001).name('Escalado inferior : ').listen();

    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }

  


  update() {
   // this.h = this.h * this.guiControls.escalaSup;
    this.penduloGrande.rotation.z = this.guiControls.rotacion;
    this.cajaSecundaria.rotation.z = this.guiControls.rotacion2;
    this.cajaGrande.scale.y = this.guiControls.escalaSup;
    this.cajaPequenia2.position.y = (-this.small_h) - (this.h * this.guiControls.escalaSup);
    this.cajaSecundaria.scale.y = this.guiControls.escalaInf;
    this.cajaSecundaria.position.y = (  -( this.small_h/2) - ( 0.1 * this.h ) ) - this.guiControls.movSecundario;
    this.cajaSecundaria.position.z = this.a; 
   

  }


}

export { Ejer7 };