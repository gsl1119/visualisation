import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 导入动画库
import gsap from "gsap";

// 导入dat.gui
import * as dat from "dat.gui";
//  目标：标准网格材质,置换贴图

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

// 导入纹理
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAplhaTexture = textureLoader.load("./textures/door/alpha.jpg");

const doorAoTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);

// 导入置换贴图
const doorHeightTextrue = textureLoader.load("./textures/door/height.jpg");

// 3、添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);
// 材质
const material = new THREE.MeshStandardMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  alphaMap: doorAplhaTexture,
  // opacity: 0.3,
  transparent: true,
  aoMap: doorAoTexture,
  displacementMap: doorHeightTextrue,
  aoMapIntensity: 1,
  displacementScale: 0.1,
  // side: THREE.DoubleSide,
});
// basicMaterial.side = THREE.DoubleSide;
const cube = new THREE.Mesh(cubeGeometry, material);
scence.add(cube);

// 给cube添加第二组uv
cubeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);

// 添加平面
const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(1.5, 0, 0);
scence.add(plane);

// 给平面设置第二组uv
planeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scence.add(light);

// 设置直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scence.add(directionalLight);

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
