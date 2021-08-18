import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import {Brazo} from './brazo.js'
class Enemigo extends THREE.Object3D {
  constructor(gui, titleGui, camino) {
    super();
    this.ruta = camino;
    var texture = new THREE.TextureLoader().load('../imgs/textura_robot.jpg');
    this.materialCuerpo = new THREE.MeshPhongMaterial ({map: texture});
    var textureRueda = new THREE.TextureLoader().load('../imgs/textura_rueda.jpg');
    this.materialRueda = new THREE.MeshPhongMaterial ({map: textureRueda});
    
    this.material = new THREE.MeshPhongMaterial({ color: 0xCF0000 });
    this.material2 = new THREE.MeshPhongMaterial({ color: 0xCF5920 });
    this.material3 = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    this.parteBaja = this.createParteBaja();
    this.brazo_right = new Brazo(gui,"Controles del brazo derecho");
    this.brazo_left = new Brazo(gui,"Controles del brazo izquierdo");
    this.brazo_right.rotation.z = Math.PI;
    this.brazo_right.position.x = -2;
    this.brazo_left.position.x = 2;
    
    var geo_cuerpo = new THREE.CylinderGeometry(2,2,5); //Aqui creo el cuerpo
    this.cuerpo = new THREE.Mesh(geo_cuerpo, this.materialCuerpo);

    this.cuerpo.add(this.brazo_left);
    this.cuerpo.add(this.brazo_right);
    this.cuerpo.add(this.parteBaja);
    this.cabeza = this.createCabeza();
    this.cuerpo.add(this.cabeza);
    this.add(this.cuerpo);
    
    var origen = {x:0};
    var destino = {x:1};
    var that = this;
    this.t = 0;
    this.movimiento = new TWEEN.Tween(origen)
                                          .to(destino,10000)
                                          .easing(TWEEN.Easing.Linear.None)
                                          .repeat(Infinity)
                                          .onUpdate( function(){
                                            that.t = origen.x;
                                            var posicion = that.ruta.getPointAt(that.t);
                                            that.cuerpo.position.copy(posicion);
                                            var tangente = that.ruta.getTangentAt(that.t);
                                            posicion.add(tangente);
                                            that.cuerpo.lookAt(posicion);
                                          });

    

    
    this.movimiento.start();




   
  
 

  }

  createParteBaja(){
    var geo_pata_right = new THREE.BoxGeometry(0.25,4,1);
    var geo_pata_left = new THREE.BoxGeometry(0.25,4,1);
    geo_pata_left.translate(1,1.5,0);
    geo_pata_right.translate(-1,1.5,0);
    this.geo_rueda = new THREE.CylinderGeometry(2,2,0.25,20);
    this.geo_rueda.rotateZ(Math.PI/2);
    var geo_eje = new THREE.CylinderGeometry(0.25,0.25,2);
    geo_eje.rotateZ(Math.PI/2);


    var pata_left = new THREE.Mesh(geo_pata_left,this.materialCuerpo);
    var pata_right = new THREE.Mesh(geo_pata_right,this.materialCuerpo);
    var rueda = new THREE.Mesh(this.geo_rueda,this.materialRueda);
    var eje = new THREE.Mesh(geo_eje,this.material2);
    eje.position.y-=5;
    eje.add(pata_left);
    eje.add(pata_right);
   
    eje.add(rueda);
    return eje;
  }

  
  createCabeza(){
    var geo_cabeza = new THREE.BoxGeometry(4,4,4);

    var geo_ojo_derecho = new THREE.BoxGeometry(1,0.5,2.1);
    geo_ojo_derecho.translate(1,0.5,1);

    var geo_ojo_izquierdo = new THREE.BoxGeometry(1,0.5,2.1);
    geo_ojo_izquierdo.translate(-1,0.5,1);

    var geo_boca = new THREE.BoxGeometry(1.5,0.5,2.1);
    geo_boca.translate(0,-0.5,1);

    var cabeza = new THREE.Mesh(geo_cabeza,this.materialCuerpo);
    var ojo_derecho = new THREE.Mesh(geo_ojo_derecho,this.material);
    var ojo_izquierdo = new THREE.Mesh(geo_ojo_izquierdo,this.material);
    var boca = new THREE.Mesh(geo_boca,this.material3);
    cabeza.add(ojo_derecho);
    cabeza.add(ojo_izquierdo);
    cabeza.add(boca);
    cabeza.position.y+=3.5;
    return cabeza;
  }

  
  

  


  update() {
    this.geo_rueda.rotateX(0.05);
    this.brazo_right.update();
    this.brazo_left.update();
    TWEEN.update();
  }


}



export { Enemigo };