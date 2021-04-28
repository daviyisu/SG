import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'



class Ejer8 extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    this.createGUI(gui, titleGui);
    let radius = 15;
    let steps = 12;
  
    var puntos = [];
    var xValues = [];
    var zValues = [];
    for (var i = 0; i < steps; i++) {
      xValues[i] = (radius * Math.cos(2 * Math.PI * i / steps)); //Calculo las coordenadas x y z de las esferas
      zValues[i] = (radius * Math.sin(2 * Math.PI * i / steps));
      
  }


  for(let i = 0; i < xValues.length; i++) {
    
    this.temp = this.createSphere();
    this.temp.position.x = xValues[i];   //Creo las esferas, les doy esas coordenadas y las añado
    this.temp.position.z = zValues[i];
    this.add(this.temp);
  }

  this.tiempoAnterior = Date.now();
  this.sphere = this.createSphere();
  this.sphere.position.x = xValues[0]-4; //4 es el radio lo restamos para dejar la esfera junto a las marcas
  this.sphere.position.z = zValues[0];
  this.esfera = new THREE.Object3D();
  this.esfera.add(this.sphere);

  this.add(this.esfera);

    
  
  }

  createSphere() {
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialSphere = new THREE.MeshPhongMaterial ({map: texture});
    var sphereGeom = new THREE.SphereGeometry(2);
    var sphere = new THREE.Mesh(sphereGeom, materialSphere);
    return sphere;
    
  }

  createGUI(gui, titleGui) {
		this.guiControls = new function () {
			this.velocidad = 0;

			this.reset = function () {
				this.velocidad = 0;
			}
		}

		var folder = gui.addFolder(titleGui);
		// Estas lineas son las que añaden los componentes de la interfaz
		// Las tres cifras indican un valor mínimo, un máximo y el incremento
		// El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
		folder.add(this.guiControls, 'velocidad', -12, 12, 0.1).name('Velotcidad (marcas/s): ').listen();
		folder.add(this.guiControls, 'reset').name('[ Reset ]');
	};



  update() {
   var tiempoActual = Date.now();
   var segundosTranscurridos = (tiempoActual-this.tiempoAnterior)/1000;
   this.esfera.rotation.y += this.guiControls.velocidad * segundosTranscurridos;
   this.tiempoAnterior = tiempoActual;
  }


}

export { Ejer8 };