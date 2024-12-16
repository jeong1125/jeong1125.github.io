import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let target = document.getElementById('threejs');
let rx = target.clientWidth; // 렌더링을 위한 width
let ry = target.clientHeight; // 렌더링을 위한 height

let model; // 3D 모델
let modelIndex = 1; // 현재 모델 인덱스 (1: dog, 2: cat)

const scene = new THREE.Scene();

// 카메라 설정
const camera = new THREE.PerspectiveCamera(75, target.clientWidth / target.clientHeight, 0.0001, 10000);
camera.position.set(0, 0, 10); // 초기 화면에서 모델 크기, 위치 조정

// THREE.WebGLRenderer 설정
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // 투명 배경 지정 alpha: true
renderer.setSize(rx, ry, false);
renderer.setAnimationLoop(animate);
target.appendChild(renderer.domElement);

// 조명 프리셋 사용 (PMREMGenerator)
const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

// 컨트롤 설정 (OrbitControls 사용)
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

// GLTF 로더 초기화
const loader = new GLTFLoader();

// 모델 로딩 함수
function loadModel(modelPath) {
    loader.load(modelPath, function (gltf) {
        if (model) {
            scene.remove(model); // 이전 모델을 씬에서 제거
        }
        model = gltf.scene;
        scene.add(model);
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
    }, undefined, function (error) {
        console.log('GLTF loading failed:', error);
    });
}

// 초기 모델 로드 (처음 로드될 모델)
loadModel('assets/dog3.glb'); // 첫 번째 모델 로드


		// 로고 클릭 이벤트
	document.getElementById('logo').addEventListener('click', () => {
    const logo = document.getElementById('logo');
    
    // active 클래스를 추가하여 크기 커짐
    logo.classList.add('active');
    
    // 0.2초 후에 active 클래스 제거 (원래 크기로 돌아옴)
    setTimeout(() => {
        logo.classList.remove('active');
    }, 200);  // 200ms 후에 원래 크기로 돌아감
	});

	// 로고 클릭 이벤트
	document.getElementById('logo').addEventListener('click', () => {
    if (modelIndex === 1) {
        loadModel('assets/Cat.glb'); // 두 번째 모델 로드
        modelIndex = 2;
    } else {
        loadModel('assets/dog3.glb'); // 첫 번째 모델로 돌아감
        modelIndex = 1;
    }
	});

	// 애니메이션 함수 (렌더링 처리)
	function animate() {
    if (model) {
        model.rotation.y += 0.002; // 모델이 y축 기준으로 회전하는 속도
    }
    renderer.render(scene, camera);
	}

	// 노래
	window.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('assets/jazzlofi.mp3'); // 음악 파일 경로
    audio.loop = true; // 반복 재생 설정
    audio.volume = 0.5; // 볼륨 설정 (0.0 ~ 1.0)

    // Play 버튼과 Pause 버튼
    const playButton = document.getElementById('play-music');
    const pauseButton = document.getElementById('pause-music');

    // Play 버튼 클릭 시 음악 재생
    playButton.addEventListener('click', () => {
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
        playButton.disabled = true;  // Play 버튼 비활성화
        pauseButton.disabled = false; // Stop 버튼 활성화
    });

    // Stop 버튼 클릭 시 음악 일시정지
    pauseButton.addEventListener('click', () => {
        audio.pause();
        playButton.disabled = false; // Play 버튼 활성화
        pauseButton.disabled = true;  // Stop 버튼 비활성화
    });

    // 기본 상태에서 Stop 버튼 비활성화
    pauseButton.disabled = true;

    // 볼륨 슬라이더 처리
    const volumeSlider = document.getElementById('volume-slider');
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value; // 슬라이더 값에 따라 오디오 볼륨 변경
    });
});


// 반딧불이 효과 생성
const firefliesContainer = document.getElementById('fireflies');

// 반딧불이 점을 랜덤하게 생성하는 함수
function createFireflies(num) {
    for (let i = 0; i < num; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        
        // 랜덤한 위치 지정
        firefly.style.top = `${Math.random() * 100}%`;
        firefly.style.left = `${Math.random() * 100}%`;
        
        // 랜덤한 크기 지정
        firefly.style.width = `${Math.random() * 5 + 3}px`;
        firefly.style.height = firefly.style.width; // 너비와 높이를 같게 설정
        
        // 랜덤한 애니메이션 타이밍 설정
        firefly.style.animationDuration = `${Math.random() * 2 + 1}s`; // 애니메이션 시간 1~3초
        firefly.style.animationDelay = `${Math.random() * 2}s`; // 애니메이션 지연 시간 0~2초
        
        firefliesContainer.appendChild(firefly);
    }
}

// 반딧불이 점 50개 생성
createFireflies(50);

