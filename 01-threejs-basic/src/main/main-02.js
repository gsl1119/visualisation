import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//  目标：使用控制器查看3d物体

// 1.创建场景
const scence = new THREE.Scene();

// 2.创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机的位置
camera.position.set(0, 0, 10);
scence.add(camera);

// 3、添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 将几何体添加到场景中
scence.add(cube);

// 4、初始化渲染器
const renderer = new THREE.WebGL1Renderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webgl渲染内容添加到oody
document.body.appendChild(renderer.domElement);

// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scence, camera);
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 创建坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scence.add(axesHelper);

function render() {
  renderer.render(scence, camera);
  requestAnimationFrame(render);
}
render();
