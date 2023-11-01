import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 导入动画库
import gsap from "gsap";

// 导入dat.gui
import * as dat from "dat.gui";
//  目标：打造炫酷的三角形

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
for (let i = 0; i < 50; i++) {
  // 每一个三角形需要三个当店，每个顶点需要三个值
  const geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9);
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 10 - 5;
  }

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  );
  let color = new THREE.Color(Math.random(), Math.random(), Math.random);
  const Material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.5,
  });

  const mesh = new THREE.Mesh(geometry, Material);
  scence.add(mesh);
}

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

// 设置动画
// gsap.to(cube.position, { x: 5, duration: 5 });
// gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5 });

// var animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: "power1.inOut",
//   // 设置重复次数，无限次循环-1
//   repeat: -1,
//   // 往返运动
//   yoyo: true,
//   // delay，延迟2秒运动
//   delay: 2,
//   onComplete: () => {
//     console.log("动画完成");
//   },
//   onStart: () => {
//     console.log("动画开始 ");
//   },
// });
// gsap.to(cube.rotation, {
//   x: 2 * Math.PI,
//   duration: 5,
//   ease: "power1.inOut",
//   // repeat,
// });

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
