//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G384832023 古川心
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { OrbitControls } from 'three/addons';
import { GUI } from "ili-gui";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const param = {
    axes: true, // 座標軸
  };

  // GUIコントローラの設定
  const gui = new GUI();
  gui.add(param, "axes").name("座標軸");

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(-10,20,40);
  camera.lookAt(-10,-15,20);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x406080);
  renderer.setSize(window.innerWidth, innerHeight);
  document.getElementById("output").appendChild(renderer.domElement);

  //カメラコントロール
  const orbitControls = new OrbitControls(camera, renderer.domElement);

  //光源の作成
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(20, 35, 10);
  scene.add(light);

  // 描画処理

  //壁と床
  /*const textureLoader = new THREE.TextureLoader();
  const gara = textureLoader.load("yuka.jpg");
  const yukaMaterial = new THREE.MeshPhongMaterial({map: gara});*/
  const yuka = new THREE.Mesh(new THREE.PlaneGeometry(40,60), new THREE.MeshLambertMaterial({color: "#930"}));
  yuka.rotation.x = -Math.PI/2;
  scene.add(yuka);
  const kabe1 = new THREE.Mesh(new THREE.PlaneGeometry(60,40),  new THREE.MeshLambertMaterial({color: "white"}));
  kabe1.rotation.y = Math.PI/2;
  kabe1.position.set(-20,20,0);
  scene.add(kabe1);
  const kabe2 = new THREE.Mesh(new THREE.PlaneGeometry(40,40),  new THREE.MeshLambertMaterial({color: "white"}));
  kabe2.position.set(0,20,-30);
  scene.add(kabe2);

  //勉強机
  const desk = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.BoxGeometry(1,10,13), new THREE.MeshLambertMaterial({color: "black"}));
    desk.add(a);
    const b = a.clone();
    b.position.x = 19;
    desk.add(b);
    const c = new THREE.Mesh(new THREE.BoxGeometry(20,1,13), new THREE.MeshLambertMaterial({color: "black"}));
    c.position.set(9.5,5.5,0);
    desk.add(c);
    const d = new THREE.Mesh(new THREE.BoxGeometry(1,24,6), new THREE.MeshLambertMaterial({color: "black"}));
    d.position.set(0,17,-3.5);
    desk.add(d);
    const e = d.clone();
    e.position.set(9.5,17,-3.5);
    desk.add(e);
    const f = d.clone();
    f.position.set(19,17,-3.5);
    desk.add(f);
    const g = new THREE.Mesh(new THREE.BoxGeometry(20,1,6), new THREE.MeshLambertMaterial({color: "black"}));
    g.position.set(9.5,29,-3.5);
    desk.add(g);
    const h = g.clone();
    h.position.set(9.5,14,-3.5);
    desk.add(h);
  }
  desk.position.set(-19.5,5,-23.5);
  scene.add(desk);

  //パソコン
  const display = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.BoxGeometry(6.2,3.6,0.2),new THREE.MeshLambertMaterial({color: "silver"}));
    display.add(a);
    const b = new THREE.Mesh(new THREE.BoxGeometry(1.9,0.1,1.9),new THREE.MeshLambertMaterial({color: "silver"}));
    b.position.y = -2.9;
    display.add(b);  
    const theta = Math.PI/8;
    const c = new THREE.Mesh(new THREE.BoxGeometry(1.5,2.0/Math.cos(theta),0.1),new THREE.MeshLambertMaterial({color: "silver"}));
    c.rotation.x = theta;
    c.position.set(0,-1.9,-((2.0 * Math.tan(theta))/2));
    display.add(c);
  }
  display.position.set(-5,14,-28);
  scene.add(display);

  // 描画関数
  function render() {
    //カメラ制御の更新
    orbitControls.update();
    // 座標軸の表示
    axes.visible = param.axes;
    // 描画
    renderer.render(scene, camera);
    // 次のフレームでの描画要請
    requestAnimationFrame(render);
  }

  // 描画開始
  render();
}

init();