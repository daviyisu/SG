import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Brazo extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    this.createGUI(gui, titleGui);
    var texture = new THREE.TextureLoader().load('../imgs/textura_robot.jpg');
    this.materialCuerpo = new THREE.MeshPhongMaterial ({map: texture});
    
    this.material = new THREE.MeshPhongMaterial({ color: 0xCF0000 });
    this.material2 = new THREE.MeshPhongMaterial({ color: 0xCF5920 });
    this.material3 = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    var geo_sphere = new THREE.SphereGeometry(0.25);
    var geo_cylinder = new THREE.CylinderGeometry(0.25,0.25,1);
    var geo_cylinder2 = new THREE.CylinderGeometry(0.25,0.25,1);
    var geo_sphere2 = new THREE.SphereGeometry(0.25);
    var geo_cone = new THREE.ConeGeometry(0.5,1);

    geo_cone.rotateZ(-Math.PI/2);
    geo_cone.translate(0.25+1+0.5,0,0);
    geo_cylinder.rotateZ(Math.PI/2);
    geo_cylinder.translate(0.5+0.25,0,0);
    

    var antebrazo = new THREE.Mesh(geo_cylinder,this.materialCuerpo);
    this.codo = new THREE.Mesh(geo_sphere, this.material2);
    var mano = new THREE.Mesh(geo_cone,this.material3);
    antebrazo.add(mano);
    this.codo.add(antebrazo);
    this.codo.rotation.z = this.guiControls.rotacion;
    this.codo.position.x = 1.5;
    geo_cylinder2.rotateZ(Math.PI/2);
    geo_cylinder2.translate(0.5+0.25,0,0);
    this.hombro = new THREE.Mesh(geo_sphere2,this.material2);
    var brazo = new THREE.Mesh(geo_cylinder2,this.materialCuerpo);
    brazo.add(this.codo)
    this.hombro.add(brazo);
    this.hombro.rotation.z = this.guiControls.rotacion2;
    this.add(this.hombro);
 

  }

  createGUI(gui, titleGui) {
    // Controles para el movimiento de la parte móvil
    this.guiControls = new function () {
      this.rotacion = 0;
      this.rotacion2 = 0;
      

      this.reset = function () {
        this.rotacion = 0;
        this.rotacion2 = 0;
      }
    }



    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    var amplitud_giro = THREE.MathUtils.degToRad(45);
    folder.add(this.guiControls, 'rotacion', -amplitud_giro, amplitud_giro, 0.001).name('Rotación antebrazo. : ').listen();
    folder.add(this.guiControls, 'rotacion2', -amplitud_giro, amplitud_giro, 0.001).name('Rotación brazo. : ').listen();
    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }

  update() {
    this.codo.rotation.z = this.guiControls.rotacion;
    this.hombro.rotation.z = this.guiControls.rotacion2;
  }
}
  export { Brazo };