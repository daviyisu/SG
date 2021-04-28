import * as THREE from '../libs/three.module.js'

class Ejer4 extends THREE.Object3D {
  constructor() {
    super();
    const barr = new THREE.Shape();
    const example = new THREE.Shape();
    const exampleSinBisel = new THREE.Shape();
    var material = new THREE.MeshPhongMaterial({ color: 0xff2d00  });
    var pts = [
      new THREE.Vector3( -10, 0, 10 ),
      new THREE.Vector3( -5, 10, 5 ),
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 5, -5, 5 ),
      new THREE.Vector3( 10, 0, 10 )
    ]; 
    var path = new THREE.CatmullRomCurve3(pts);
    var options = {extrudePath: path, curveSegments: 4, steps: 30};
       
    example.moveTo(0, 0);
    example.lineTo(2, 0);
    example.lineTo(3, 2);       //Creamos dos figuras iguales pero con y sin bisel
    example.lineTo(1, 4);
    example.lineTo(-1, 2);

    exampleSinBisel.moveTo(0, 0);
    exampleSinBisel.lineTo(2, 0);
    exampleSinBisel.lineTo(3, 2);
    exampleSinBisel.lineTo(1, 4);
    exampleSinBisel.lineTo(-1, 2);

    barr.moveTo(0,0);
    barr.lineTo(2, 0);
    barr.lineTo(3, 2);       //Creamos dos figuras iguales pero con y sin bisel
    barr.lineTo(1, 4);
    barr.lineTo(-1, 2);

    const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 2, steps: 7, bevelSize: 1, bevelThickness: 1 }; //Vemos como esta la opción bevelEnabled
    const extrudeSettings2 = { depth: 1, bevelEnabled: false, bevelSegments: 2, steps: 7, bevelSize: 1, bevelThickness: 1 }; //en true o false según el ejemplo


    const geometry = new THREE.ExtrudeGeometry(example, extrudeSettings);
    const geometry2 = new THREE.ExtrudeGeometry(exampleSinBisel, extrudeSettings2);

    var geo = new THREE.ExtrudeBufferGeometry(barr, options);   
    this.barrido = new THREE.Mesh(geo, material);
    this.barrido.position.y = 5;
    this.barrido.position.x = -10;

    this.pentagonSinBisel = new THREE.Mesh(geometry2, material);
    this.pentagonSinBisel.position.y = 5;
    this.pentagonSinBisel.position.x = 10;

    this.pentagon = new THREE.Mesh(geometry, material);
    this.pentagon.position.y = 5;

    this.add(this.barrido);
    this.add(this.pentagon);
    this.add(this.pentagonSinBisel);
  }

  update() {
    this.pentagon.rotation.y += 0.02;
    this.pentagon.rotation.x += 0.02;

    this.pentagonSinBisel.rotation.y += 0.02;
    this.pentagonSinBisel.rotation.x += 0.02;

    this.barrido.rotation.y += 0.02;
    this.barrido.rotation.x += 0.02;
  }


}

export { Ejer4 };