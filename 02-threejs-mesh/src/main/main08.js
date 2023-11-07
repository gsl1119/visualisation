import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 导入动画库
import gsap from "gsap";

// 导入dat.gui
import * as dat from "dat.gui";
//  目标：AO环境遮挡贴图

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

// const texture = textureLoader.load("./textures/minecraft.png");

// // 偏移
// // doorColorTexture.offset.x = 0.5;
// // doorColorTexture.offset.y = 0.5;
// // doorColorTexture.offset.set(0.5, 0.5);

// // 纹理的旋转
// // 设置旋转的原点
// // doorColorTexture.center.set(0.5, 0.5);
// // doorColorTexture.rotation = Math.PI / 4;

// // 纹理的重复
// // doorColorTexture.repeat.set(2, 3);
// // // 设置纹理重复的模式
// // doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
// // doorColorTexture.wrapT = THREE.RepeatWrapping;

// // texture纹理显示设置
// // texture.minFilter = THREE.NearestFilter;
// // texture.magFilter = THREE.NearestFilter;
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;

// 3、添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  alphaMap: doorAplhaTexture,
  // opacity: 0.3,
  transparent: true,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  // side: THREE.DoubleSide,
});
// basicMaterial.side = THREE.DoubleSide;
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scence.add(cube);

// 给cube添加第二组uv
cubeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);

// 添加平面
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const plane = new THREE.Mesh(planeGeometry, basicMaterial);
plane.position.set(3, 0, 0);
scence.add(plane);

// 给平面设置第二组uv
planeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);
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
