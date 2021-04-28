import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Examen extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    this.material = new THREE.MeshPhongMaterial({ color: 0xCF0000 });
    this.parteSuperior = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 0, 0), new THREE.Vector3(-5,0,-15),
      new THREE.Vector3(15,0,-15), new THREE.Vector3(15,0,-5),
      new THREE.Vector3(5, 0, 0) ]);

    this.parteInferior = new THREE.CatmullRomCurve3([
      new THREE.Vector3(5, 0, 0), new THREE.Vector3(5, 0, 20),
      new THREE.Vector3(-5, 0, 20), new THREE.Vector3(-5, 0, 0)
       ]);

       var geometryLine = new THREE.Geometry();
       var otherGeometryLine = new THREE.Geometry();
       geometryLine.vertices = this.parteSuperior.getPoints(100);
       otherGeometryLine.vertices = this.parteInferior.getPoints(100);
       var visibleSpline = new THREE.Line(geometryLine, this.material);
      var othervisibleSpline = new THREE.Line(otherGeometryLine, this.material);
      this.add(visibleSpline);
      this.add(othervisibleSpline);

    var geometriaEsfera = new THREE.SphereGeometry(1, 10, 10);
    this.esfera = new THREE.Mesh(geometriaEsfera, new THREE.MeshNormalMaterial());

    this.esfera.position.x=5;
    this.add(this.esfera);



    var origen1 = {x:0};
    var destino1 = {x:1};
    var origen2 = {x:0};
    var destino2 = {x:1};
    var that = this;
    this.t = 0;
    this.movimientoRight = new TWEEN.Tween(origen1)
                                          .to(destino1,3000)
                                          .easing(TWEEN.Easing.Quadratic.InOut)
                                          .onUpdate( function(){
                                            that.t = origen1.x;
                                            var posicion = that.parteInferior.getPointAt(that.t);
                                            that.esfera.position.copy(posicion);
                                            var tangente = that.parteInferior.getTangentAt(that.t);
                                            posicion.add(tangente);
                                            that.esfera.lookAt(posicion);
                                          });

    this.movimientoLeft = new TWEEN.Tween(origen2)
                                          .to(destino2, 3000)
                                          .easing(TWEEN.Easing.Quadratic.InOut)
                                          .onUpdate( function(){
                                            that.t = origen2.x;
                                            var posicion = that.parteSuperior.getPointAt(that.t);
                                            that.esfera.position.copy(posicion);
                                            var tangente = that.parteSuperior.getTangentAt(that.t);
                                            posicion.add(tangente);
                                            that.esfera.lookAt(posicion);
                                          });

    this.movimientoRight.chain(this.movimientoLeft);
    this.movimientoLeft.chain(this.movimientoRight);
    this.movimientoRight.start();




    this.radio_esfera = 2;
   // this.createModelo();
  }

  

 /* crearSemicirculo(){
    var sphereGeom = new THREE.SphereGeometry(this.radio_esfera, 20, 20);
    const cajaAux = new THREE.BoxGeometry(4,4,4);
    cajaAux.translate(0,-this.radio_esfera,0);
    var cajaAuxbsp = new ThreeBSP (cajaAux);
    var sphereAux = new ThreeBSP (sphereGeom);
    var semicirculo = sphereAux.subtract(cajaAuxbsp);
    var semicirculoGeo = semicirculo.toGeometry();
    var bufferSemi = new THREE.BufferGeometry().fromGeometry(semicirculoGeo);
   //this.final = new THREE.Mesh(bufferSemi, this.material);
    return bufferSemi;
  }

  



  createModelo(){
    

    this.mandibulaUp = new THREE.Mesh(this.crearSemicirculo(), this.material);
    this.mandibulaDown = new THREE.Mesh(this.crearSemicirculo(), this.material);
    this.mandibulaDown.rotation.z += Math.PI;
    this.mandibulaDown.position.x=this.radio_esfera;
    this.mandibulaDown.rotation.z=this.guiControls.rotacion;
    this.esferaDown = new THREE.Object3D();
    this.esferaUp = new THREE.Object3D();
    this.esferaDown.add(this.mandibulaDown);
    this.esferaUp.add(this.mandibulaUp);
    this.esferaUp.add(this.esferaDown);
    this.add(this.esferaUp);

    
  

  }*/

 
  

  


  update() {
   TWEEN.update();

  }




}
export { Examen };