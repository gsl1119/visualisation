import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 导入动画库
import gsap from "gsap";

// 导入dat.gui
import * as dat from "dat.gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

//  目标：灯光与阴影
// 灯光阴影
// 1、材质要满足能够对光照有反应
// 2、设置渲染器开启阴影的计算 renderer.shadowMap.enavled = true
// 3、设置光照投射阴影 directionlLight.castShadow = true
// 4、设置物体投影阴影 sphere.castShaow = true
// 5、设置物体接收阴影 plane.receiveShaow = true

// 1.基础材质纹理
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

// 添加球
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial();
const spher = new THREE.Mesh(sphereGeometry, material);
spher.castShadow = true;
scence.add(spher);

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scence.add(plane);

// // 给场景田间背景
// scence.background = envMapTexture;
// // 给场景所有的物体添加默认的环境贴图
// scence.environment = envMapTexture;

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scence.add(light);

// 设置直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scence.add(directionalLight);

// 4、初始化渲染器
const renderer = new THREE.WebGL1Renderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;

// 将webgl渲染内容添加到oody
document.body.appendChild(renderer.domElement);

// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scence, camera);
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果
controls.enableDamping = true;
// 创建坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scence.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

window.addEventListener("dblclick", () => {
  // 双击控制屏幕控制全屏，退出全屏
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

function render() {
  controls.update();
  renderer.render(scence, camera);
  requestAnimationFrame(render);
}
render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像的投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
