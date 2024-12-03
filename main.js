import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



let target = document.getElementById('threejs');
let rx = target.clientWidth; // 렌더링을 위한 width
let ry = target.clientHeight; // 렌더링을 위한 height

let model; // 3D 모델

const scene = new THREE.Scene();

// 카메라 설정
const camera = new THREE.PerspectiveCamera( 75, target.clientWidth/target.clientHeight, 0.0001, 10000 );
camera.position.set(0, 0, 2); // 초기 화면에서 모델 크기, 위치 조정

// THREE.WebGLRenderer 설정
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // 투명 배경 지정 alpha: true
renderer.setSize( rx, ry, false );
renderer.setAnimationLoop( animate );
target.appendChild( renderer.domElement );

// 조명 프리셋 사용 (PMREMGenerator)
const pmremGenerator = new THREE.PMREMGenerator( renderer );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

// 컨트롤 설정 (OrbitControls 사용)
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;



// GLTF 모델 로딩
const loader = new GLTFLoader();
loader.load( 'assets/dog2.gltf', function ( gltf ) {
	model = gltf.scene;
	model.position.set( 0, 0, 0 );
	model.scale.set( 1, 1, 1 );
	scene.add( model );
}, undefined, function ( error ) {
	console.log( 'GLTF loading falied...' );
} );


// 애니메이션 함수 (렌더링 처리)
function animate() {

	if(model != null) {
		model.rotation.y += 0.002; // 모델이 y축 기준으로 회전하는 속도
	}

	renderer.render( scene, camera );
}