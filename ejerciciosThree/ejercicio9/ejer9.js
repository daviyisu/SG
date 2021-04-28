import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import {Nave} from './nave.js'


class Ejer9 extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
     this.rightPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(10,5,0),
      new THREE.Vector3(20,0,0), new THREE.Vector3(20,-5,0),
      new THREE.Vector3(0, 0, 0) ]);

    this.leftPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(-10, 5, 0),
      new THREE.Vector3(-20, 0, 0), new THREE.Vector3(-10, -5, 0), 
      new THREE.Vector3(0, 0, 0) ]);

    var geometryLine = new THREE.Geometry();
    var otherGeometryLine = new THREE.Geometry();
    geometryLine.vertices = this.rightPath.getPoints(100);
    otherGeometryLine.vertices = this.leftPath.getPoints(100);

    this.nave = new Nave();
    var material = new THREE.LineBasicMaterial({color: 0xff0055});
    var visibleSpline = new THREE.Line(geometryLine, material);
    var othervisibleSpline = new THREE.Line(otherGeometryLine, material);
    this.add(visibleSpline);
    this.add(othervisibleSpline);
    this.add(this.nave);

    var origen1 = {x:0};
    var destino1 = {x:1};
    var origen2 = {x:0};
    var destino2 = {x:1};
    var that = this;
    this.t = 0;
    this.movimientoRight = new TWEEN.Tween(origen1)
                                          .to(destino1,4000)
                                          .easing(TWEEN.Easing.Quadratic.InOut)
                                          .onUpdate( function(){
                                            that.t = origen1.x;
                                            var posicion = that.rightPath.getPointAt(that.t);
                                            that.nave.position.copy(posicion);
                                            var tangente = that.rightPath.getTangentAt(that.t);
                                            posicion.add(tangente);
                                            that.nave.lookAt(posicion);
                                          });

    this.movimientoLeft = new TWEEN.Tween(origen2)
                                          .to(destino2, 8000)
                                          .easing(TWEEN.Easing.Quadratic.InOut)
                                          .onUpdate( function(){
                                            that.t = origen2.x;
                                            var posicion = that.leftPath.getPointAt(that.t);
                                            that.nave.position.copy(posicion);
                                            var tangente = that.leftPath.getTangentAt(that.t);
                                            posicion.add(tangente);
                                            that.nave.lookAt(posicion);
                                          });

    this.movimientoRight.chain(this.movimientoLeft);
    this.movimientoLeft.chain(this.movimientoRight);
    this.movimientoRight.start();

	};

  



  update() {
    TWEEN.update();
  }


}

export { Ejer9 };