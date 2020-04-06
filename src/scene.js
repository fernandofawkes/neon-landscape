import PARAMS, { VARS } from './pane';

import * as THREE from 'three';
import SimplexNoise from './noise';

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
scene.add(plane);

const noiseMaker = new SimplexNoise();

for (let i = 0; i < geometry.vertices.length; i++) {
  const lateralFactor = Math.abs(PARAMS.scale / 2 - (i % PARAMS.scale));
  if (lateralFactor > 2) {
    geometry.vertices[i].z = noiseMaker.noise3d(i / 15, (i % PARAMS.scale) / 15, 0) * Math.sin(lateralFactor * 1.8 / 180) * 40;
  }
}
geometry.verticesNeedUpdate = true;




var geo = new THREE.WireframeGeometry(geometry);

var mat = new THREE.LineBasicMaterial({ color: `#fe1493`, linewidth: 2 });

var wireframe = new THREE.LineSegments(geo, mat);
scene.add(wireframe);


plane.translateX(-0.667);
wireframe.translateX(-0.667);
wireframe.translateZ(0.01);


renderer.render(scene, camera);


function animate() {

  requestAnimationFrame(animate);
  camera.position.y += PARAMS.speed * 0.01;
  // plane.parameters.heightSegments = PARAMS.scale;
  renderer.render(scene, camera);
}



animate()