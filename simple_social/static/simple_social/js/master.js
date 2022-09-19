import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js";

const backgroundColor = 0x152238;

const getRandomParticlePos = (particleCount) => {
  let arr = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    arr[i] = Math.random() * (100 - -50) + -50;
  }
  return arr;
};

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 100);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(backgroundColor); //0x );

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow(0.94, 5.0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);

controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.9;

controls.minDistance = 3;
controls.maxDistance = 20;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;

const geometrys = [new THREE.BufferGeometry()];

geometrys[0].setAttribute(
  "position",
  new THREE.BufferAttribute(getRandomParticlePos(3000), 3)
);

const materials = [
  new THREE.PointsMaterial({
    size: 1.5,
    transparent: true,
    color: "#9099a1"
  })
];

const rainPoints = new THREE.Points(geometrys[0], materials[0]);
scene.add(rainPoints);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();

  const positions = rainPoints.geometry.attributes.position.array;

  let index = 0;

  for (let i = 0, l = positions.length; i < l; i++) {
    positions[index] = positions[index];
    positions[index + 1] = positions[index + 1] - 0.95;
    positions[index + 2] = positions[index + 2];

    if (positions[index + 1] < -50) {
      positions[index + 1] = 50;
    }

    index += 3;
  }

  rainPoints.geometry.attributes.position.needsUpdate = true;
}

camera.lookAt(rainPoints);
render();