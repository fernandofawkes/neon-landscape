import PARAMS, { VARS } from './pane';

import * as THREE from 'three';
import SimplexNoise from './noise';

import THREEx from './threex.geometricglowmesh';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(VARS.width, VARS.height);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, VARS.width / VARS.height, 0.1, 1000);

camera.position.set(0, - Math.cos(Math.PI / 40) * 25, Math.sin(Math.PI / 40) * 25);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const geometry = new THREE.PlaneGeometry(VARS.width / 10, VARS.height / 10, PARAMS.scale - 1, PARAMS.scale - 1);
var wireframe = new THREE.MeshBasicMaterial({ color: `#fe1493`, wireframe: true });
var faces = new THREE.MeshBasicMaterial({ color: `#333` });


var plane = new THREE.Mesh(geometry, faces);
plane.translateX(-0.667);

scene.add(plane);

const noiseMaker = new SimplexNoise();

for (let i = 0; i < geometry.vertices.length; i++) {
  const lateralFactor = Math.abs(PARAMS.scale / 2 - (i % PARAMS.scale));
  if (lateralFactor > 1) {
    geometry.vertices[i].z = Math.abs(noiseMaker.noise3d(i / 15, (i % PARAMS.scale) / 15, 0) * Math.sin(lateralFactor * 1.8 / 180) * 40);
  }
}
geometry.verticesNeedUpdate = true;


var geo = new THREE.WireframeGeometry(plane.geometry);
var mat = new THREE.LineBasicMaterial({ color: `#fe1493` });
var wireframe = new THREE.LineSegments(geo, mat);


wireframe.translateX(-0.667);
wireframe.translateZ(0.01);
scene.add(wireframe);


//////////////////////////////////////////////////////////////////////////////////
//		create the glowMesh						//
//////////////////////////////////////////////////////////////////////////////////

// create a glowMesh
var glowMesh = new THREEx.GeometricGlowMesh(plane)
plane.add(glowMesh.object3d)

////////////////////////////////////////////////////////////////////////////////
// customize glow mesh if needed					//
////////////////////////////////////////////////////////////////////////////////

// example of customization of the default glowMesh
var insideUniforms = glowMesh.insideMesh.material.uniforms
insideUniforms.glowColor.value.set(`#fe1493`);
insideUniforms.coeficient.value = 0.9;
insideUniforms.power.value = 10;

var outsideUniforms = glowMesh.outsideMesh.material.uniforms
outsideUniforms.glowColor.value.set('#04d9ff')
outsideUniforms.coeficient.value = 0.5;
outsideUniforms.power.value = 1;

renderer.render(scene, camera);


function animate() {

  requestAnimationFrame(animate);
  camera.position.y += PARAMS.speed * 0.05;
  // plane.parameters.heightSegments = PARAMS.scale;
  renderer.render(scene, camera);
}



animate()