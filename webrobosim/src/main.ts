import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

// --- 1. SCENE SETUP ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020); 
scene.add(new THREE.GridHelper(20, 20)); 

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls (Mouse rotation/zoom)
const controls = new OrbitControls(camera, renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// --- 2. ROBOT SETUP (Placeholder) ---
const baseGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 32);
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000});
const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
baseMesh.position.y = 0.25;
scene.add(baseMesh);

// --- 3. UI SETUP ---
const gui = new GUI({ title: 'Robot Controls'});
const robotParams = {
  baseRotation: 0,
  shoulderLift: 0
};

gui.add(robotParams, 'baseRotation', -Math.PI, Math.PI).name('Base (Theta 1)');
gui.add(robotParams, 'shoulderLift', -Math.PI / 2, Math.PI / 2).name('Shoulder (Theta 2)');

// --- 4. ANIMATION LOOP ---
function animate() {
  requestAnimationFrame(animate);

  // Update controls
  controls.update();

  // Renderer
  renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});