import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'



class Ensayo extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    this.createGUI(gui, titleGui);
    this.radio_elipse = 10;
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    this.elipse = new THREE.Mesh(this.crearElipse(this.radio_elipse), new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.4
    }));
    
    this.add(this.elipse);
    

    

    
    var geometriaEsfera = new THREE.SphereGeometry(0.5, 10, 10);
    this.esfera = new THREE.Mesh(geometriaEsfera, new THREE.MeshNormalMaterial());

    this.esfera.position.x=10;
    this.add(this.esfera);

    
    var origen = {x:0};
    var destino = {x:1};
    var that = this;
    this.t = 0;
    this.movimiento = new TWEEN.Tween(origen)
                                          .to(destino,4000)
                                          .easing(TWEEN.Easing.Linear.None)
                                          .onUpdate( function(){
                                            
                                            that.t = origen.x;
                                            var posicion = that.recorridoAnimacion.getPointAt(that.t);
                                            that.esfera.position.copy(posicion);
                                            var tangente = that.recorridoAnimacion.getTangentAt(that.t);
                                            posicion.add(tangente);
                                            that.esfera.lookAt(posicion);
                                          })
                                          .onComplete( function (){
                                            origen.x = 0;
                                          })
                                          .repeat(Infinity);

   var origen1 = {y: 0};
   var destino2 = {y: this.altura_cilindro};
    
   this.movimiento2 = new TWEEN.Tween(origen1)
                                          .to(destino2,1000)
                                          .easing(TWEEN.Easing.Linear.None)
                                          .onUpdate( function(){
                                            
                                            
                                           that.esfera.position.y = origen1.y;
                                            
                                          
                                          })
                                          .yoyo(true)
                                          .repeat(Infinity);

                                        
    
    this.movimiento.start();
    this.movimiento2.start();
    

  };

  crearElipse(radio){
    const curve = new THREE.EllipseCurve(
      0, 0,            // ax, aY
      radio, 10,           // xRadius, yRadius
      0, 2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    );

    const points = curve.getPoints(50);
   

    
    var points3D = [];

    

    points.forEach(e => {
      points3D.push(new THREE.Vector3(e.x, 0, e.y));
    })

    this.recorridoAnimacion = new THREE.CatmullRomCurve3(points3D);
    var geometryLine = new THREE.Geometry();
    geometryLine.vertices = this.recorridoAnimacion.getPoints(100);
   
    this.altura_cilindro = 5;
    var shape = new THREE.Shape(points);
    var geometria = new THREE.ExtrudeBufferGeometry(shape, { depth: this.altura_cilindro, bevelEnabled: false });
    geometria.rotateX(-Math.PI / 2)
    return geometria;
    

    
  }


  createGUI(gui, titleGui) {
		this.guiControls = new function () {
			this.radio_elipse = 10;

			this.reset = function () {
				this.radio_elipse = 10;
			}
		}

		var folder = gui.addFolder(titleGui);
		// Estas lineas son las que añaden los componentes de la interfaz
		// Las tres cifras indican un valor mínimo, un máximo y el incremento
		// El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
		folder.add(this.guiControls, 'radio_elipse', 10, 20, 0.1).name('Radio de la elipse: ').listen();
		folder.add(this.guiControls, 'reset').name('[ Reset ]');
	};



  update() {
    
    this.radio_elipse = this.guiControls.radio_elipse;
    this.elipse.geometry = this.crearElipse(this.radio_elipse);
    TWEEN.update();
  }


}

export { Ensayo };