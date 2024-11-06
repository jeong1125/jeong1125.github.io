import * as THREE from 'https://unpkg.com/three@0.141.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.141.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.141.0/examples/jsm/controls/OrbitControls.js';

// Three.js 기본 설정
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// OrbitControls 설정
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;

// 조명 추가
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(5, 10, 7);
scene.add(light1);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// GLTF 모델 로드
const loader = new GLTFLoader();
let model;

loader.load(
    'C:\Users\정병찬\Documents\GitHub\jeong1125.github.io\model.gltf',  // 모델 경로를 실제 파일 경로로 교체
    function (gltf) {
        model = gltf.scene;
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error('모델 로드 중 오류 발생:', error);
    }
);

// 화면 크기 변경에 대응
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

animate();
