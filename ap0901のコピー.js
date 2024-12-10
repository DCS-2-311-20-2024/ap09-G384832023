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
    40, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0,20,40);
  camera.lookAt(0,30,0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer(); 
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x406080);
  renderer.shadowMap.enabled = true;
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  //カメラコントロール
  const orbitControls = new OrbitControls(camera, renderer.domElement);

  // 描画処理

  //壁と床
  const heya = new THREE.Group();
  {
    const textureLoader = new THREE.TextureLoader();
    const yukagara = textureLoader.load("yuka.jpg");
    const yukaMaterial = new THREE.MeshPhongMaterial({map: yukagara});
    const yuka = new THREE.Mesh(new THREE.PlaneGeometry(40,60), yukaMaterial);
    yuka.rotation.x = -Math.PI/2;
    yuka.receiveShadow = true;
    heya.add(yuka);
    const ten = new THREE.Mesh(new THREE.PlaneGeometry(40,60), new THREE.MeshLambertMaterial({color: "#ccc"}));
    ten.rotation.x = Math.PI/2;
    ten.position.y = 40;
    heya.add(ten);
    const kabe1 = new THREE.Mesh(new THREE.PlaneGeometry(42.2,40),  new THREE.MeshLambertMaterial({color: "#ccc"}));
    kabe1.rotation.y = Math.PI/2;
    kabe1.position.set(-20,20,-8.85);
    heya.add(kabe1);
    const kabe2 = new THREE.Mesh(new THREE.PlaneGeometry(60,5.6),  new THREE.MeshLambertMaterial({color: "#ccc"}));
    kabe2.rotation.y = Math.PI/2;
    kabe2.position.set(-20,37.2,0);
    heya.add(kabe2);
    const kabe3 = new THREE.Mesh(new THREE.PlaneGeometry(40,40),  new THREE.MeshLambertMaterial({color: "#ccc"}));
    kabe3.position.set(0,20,-30);
    heya.add(kabe3);
    const kabe4 = kabe3.clone();
    kabe4.rotation.y = Math.PI;
    kabe4.position.set(0,20,30);
    heya.add(kabe4);
    const kabe5 = new THREE.Mesh(new THREE.PlaneGeometry(14,40),  new THREE.MeshLambertMaterial({color: "#ccc"}));
    kabe5.rotation.y = -Math.PI/2;
    kabe5.position.set(20,20,-23.2);
    heya.add(kabe5);
    const kabe6 = new THREE.Mesh(new THREE.PlaneGeometry(9,40),  new THREE.MeshLambertMaterial({color: "#ccc"}));
    kabe6.rotation.y = -Math.PI/2;
    kabe6.position.set(20,20,25.5);
    heya.add(kabe6);
    const kabe7 = new THREE.Mesh(new THREE.PlaneGeometry(60,14),  new THREE.MeshLambertMaterial({color: "#ccc"}));
    kabe7.position.set(20,7,0);
    kabe7.rotation.y = -Math.PI/2;
    heya.add(kabe7);
    const kabe8 = new THREE.Mesh(new THREE.PlaneGeometry(60,7.4),  new THREE.MeshLambertMaterial({color: "#ccc"}));
    kabe8.position.set(20,36.1,0);
    kabe8.rotation.y = -Math.PI/2;
    heya.add(kabe8);
  }
  scene.add(heya);

  //勉強机
  const desk = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.BoxGeometry(1,10,13), new THREE.MeshPhongMaterial({color: "black"}));
    desk.add(a);
    const b = a.clone();
    b.position.x = 19;
    desk.add(b);
    const c = new THREE.Mesh(new THREE.BoxGeometry(20,1,13), new THREE.MeshPhongMaterial({color: "black"}));
    c.position.set(9.5,5.5,0);
    desk.add(c);
    const d = new THREE.Mesh(new THREE.BoxGeometry(1,24,6), new THREE.MeshPhongMaterial({color: "black"}));
    d.position.set(0,17,-3.5);
    desk.add(d);
    const e = d.clone();
    e.position.set(9.5,17,-3.5);
    desk.add(e);
    const f = d.clone();
    f.position.set(19,17,-3.5);
    desk.add(f);
    const g = new THREE.Mesh(new THREE.BoxGeometry(20,1,6), new THREE.MeshPhongMaterial({color: "black"}));
    g.position.set(9.5,29,-3.5);
    desk.add(g);
    const h = g.clone();
    h.position.set(9.5,13,-3.5);
    desk.add(h);
    /*const i = new THREE.Mesh(new THREE.BoxGeometry(20,35,1), new THREE.MeshPhongMaterial({color: "black"}));
    i.position.set(9.5,12.5,-6);
    desk.add(i);*/
  }
  desk.position.set(-19.5,5,-23.5);
  heya.add(desk);

  //パソコン
  const display = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.BoxGeometry(6.6,4,0.2),new THREE.MeshPhongMaterial({color: "black"}));
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
  heya.add(display);

  //椅子
  const chair = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.BoxGeometry(1,7,1), new THREE.MeshPhongMaterial({color: "black"}));
    chair.add(a);
    const b = new THREE.Mesh(new THREE.BoxGeometry(2,1,2), new THREE.MeshPhongMaterial({color: "black"}));
    b.position.y = -3;
    chair.add(b);
    const c = new THREE.Mesh(new THREE.BoxGeometry(5,1,6), new THREE.MeshPhongMaterial({color: "black"}));
    c.position.y = 3;
    chair.add(c);
    const d = new THREE.Mesh(new THREE.BoxGeometry(5,5,1), new THREE.MeshPhongMaterial({color: "black"}));
    d.position.set(0,5.5,2.5);
    chair.add(d);
  }
  chair.position.set(-9.5,3.5,-12);
  heya.add(chair);

  //ベッド
  const bed = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.BoxGeometry(16,5,42), new THREE.MeshLambertMaterial({color: "white"}));
    bed.add(a);
    const b = new THREE.Mesh(new THREE.BoxGeometry(16,6,3), new THREE.MeshLambertMaterial({color: "white"}));
    b.position.set(0,5.5,-19.5);
    bed.add(b);
    const c = new THREE.Mesh(new THREE.BoxGeometry(16,3,39), new THREE.MeshLambertMaterial({color: "blue"}));
    c.position.set(0,4,1.5);
    bed.add(c);
    const d = new THREE.Mesh(new THREE.BoxGeometry(1,2,3), new THREE.MeshLambertMaterial({color: "white"}));
    d.position.set(-7.5,9.5,-19.5);
    bed.add(d);
    const e = d.clone();
    e.position.set(7.5,9.5,-19.5);
    bed.add(e);
    const f = new THREE.Mesh(new THREE.BoxGeometry(16,2,0.6), new THREE.MeshLambertMaterial({color: "white"}));
    f.position.set(0,9.5,-20.7);
    bed.add(f);
    const g = new THREE.Mesh(new THREE.BoxGeometry(0.9,4.5,8), new THREE.MeshLambertMaterial({color: "white"}));
    g.position.set(-8,0,16);
    bed.add(g);
    const h = g.clone();
    h.position.set(-8,0,7.3);
    bed.add(h);
    const i = g.clone();
    i.position.set(-8,0,-1.4);
    bed.add(i);
  }
  bed.position.set(12,2.5,-9);
  heya.add(bed);

  //照明
  const syoumei = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 0.6, 12, 1),new THREE.MeshLambertMaterial({color: "white"}));
    a.position.y = 39.7;
    syoumei.add(a);
    const b = new THREE.Mesh(new THREE.SphereGeometry(5, 30, 30, Math.PI, Math.PI), new THREE.MeshLambertMaterial({color: "white"}));
    b.scale.set(1.2,1.2,0.5);
    b.rotation.x = -Math.PI/2;
    b.position.y = 39.4;
    syoumei.add(b);
  }
  heya.add(syoumei);

  //線
  const sen = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.2,60), new THREE.MeshPhongMaterial({color: "#5B4134"}));
    a.position.set(-19.9,39.9,0);
    sen.add(a);
    const b = a.clone();
    b.position.set(-19.9,39.5,0);
    sen.add(b);
    const c = a.clone();
    c.position.set(19.9,39.9,0);
    sen.add(c);
    const d = a.clone();
    d.position.set(19.9,39.5,0);
    sen.add(d);
    const e = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.8,60), new THREE.MeshPhongMaterial({color: "#5B4134"}));
    e.position.set(19.9,0.4,0);
    sen.add(e);
    const f = a.clone();
    f.position.set(19.9,1.1,0);
    sen.add(f);
    const g = new THREE.Mesh(new THREE.BoxGeometry(40,0.2,0.2), new THREE.MeshPhongMaterial({color: "#5B4134"}));
    g.position.set(0,39.9,-29.9);
    sen.add(g);
    const h = g.clone();
    h.position.set(0,39.5,-29.9);
    sen.add(h);
    const i = g.clone();
    i.position.set(0,39.9,29.9);
    sen.add(i);
    const j = g.clone();
    j.position.set(0,39.5,29.9);
    sen.add(j);
    const k = new THREE.Mesh(new THREE.BoxGeometry(40,0.8,0.2), new THREE.MeshPhongMaterial({color: "#5B4134"}));
    k.position.set(0,0.4,29.9);
    sen.add(k);
    const l = g.clone();
    l.position.set(0,1.1,29.9);
    sen.add(l);
    const m = k.clone();
    m.position.set(0,0.4,-29.9);
    sen.add(m);
    const n = g.clone();
    n.position.set(0,1.1,-29.9);
    sen.add(n);
    const o = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.8,42.2), new THREE.MeshPhongMaterial({color: "#5B4134"}));
    o.position.set(-19.9,0.4,-8.5);
    sen.add(o);
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.2,42.2), new THREE.MeshPhongMaterial({color: "#5B4134"}));
    p.position.set(-19.9,1.1,-8.5);
    sen.add(p);
  }
  heya.add(sen);

  //ドア
  const doa = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.BoxGeometry(0.2,34,17), new THREE.MeshPhongMaterial({color: "#5B4134"}));
    doa.add(a);
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.3, 30, 1),new THREE.MeshPhongMaterial({color: "#D0A900"}));
    b.rotation.z = Math.PI/2;
    b.position.set(0.25,-1.5,-6);
    doa.add(b);
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 2, 30), new THREE.MeshPhongMaterial({color: "#D0A900"}));
    c.position.set(0.4,0,8.2);
    doa.add(c);
    const d = c.clone();
    d.position.set(0.4,13,8.2);
    doa.add(d);
    const e = c.clone();
    e.position.set(0.4,-13,8.2);
    doa.add(e);
    const f = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.4, 2, 30), new THREE.MeshPhongMaterial({color: "#D0A900"}));
    f.rotation.z = Math.PI/2;
    f.position.set(1.4,-1.5,-6);
    doa.add(f);
    const g = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 4, 30), new THREE.MeshPhongMaterial({color: "#D0A900"}));
    g.rotation.x = Math.PI/2;
    g.position.set(2.1,-1.46,-4.3);
    doa.add(g);
    const h = new THREE.Mesh(new THREE.BoxGeometry(1,34.6,0.4), new THREE.MeshPhongMaterial({color: "#5B4134"}));
    h.position.set(0.6,0,8.65);
    doa.add(h);
    const i = h.clone();
    i.position.set(0.6,0,-8.65);
    doa.add(i);
    const j = new THREE.Mesh(new THREE.BoxGeometry(1,0.4,17.6), new THREE.MeshPhongMaterial({color: "#5B4134"}));
    j.position.set(0.6,17.2,0);
    doa.add(j);
    const k = j.clone();
    k.position.set(0.4,-17.2,0);
    doa.add(k);
  }
  doa.position.set(-20.9,17,21.1);
  heya.add(doa);

  //スイッチ
  const botton = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.BoxGeometry(0.2,3.7,2.3), new THREE.MeshPhongMaterial({color: "#fff2ae"}));
    botton.add(a);
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.1,0.8,1.2), new THREE.MeshPhongMaterial({color: "white"}));
    b.position.x = 0.15;
    botton.add(b);
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.6, 3, 1), new THREE.MeshLambertMaterial({color: "white"}));
    c.receiveShadow = true;
    botton.add(c);
  }
  botton.position.set(-19.9,21,8);
  heya.add(botton);

  //窓
  const mado = new THREE.Group();
  {
    const a = new THREE.Mesh( new THREE.BoxGeometry(4,18.8,0.4), new THREE.MeshLambertMaterial({color: "#5B4134"}));
    mado.add(a);
    const b = a.clone();
    b.position.z = 36.8;
    mado.add(b);
    const c = new THREE.Mesh( new THREE.BoxGeometry(4,0.4,36.8), new THREE.MeshLambertMaterial({color: "#5B4134"}));
    c.position.set(0,9.2,18.3);
    mado.add(c);
    const d = c.clone();
    d.position.set(0,-9.2,18.3);
    mado.add(d);
    const e  = new THREE.Mesh( new THREE.BoxGeometry(1,18,1), new THREE.MeshPhongMaterial({color: "black"}));
    e.position.set(1.5,0,0.7);
    mado.add(e);
    const f = e.clone();
    f.position.set(1.5,0,18.2);
    mado.add(f);
    const g = e.clone();
    g.position.set(0.5,0,18.6);
    mado.add(g);
    const h = e.clone();
    h.position.set(0.5,0,36.1);
    mado.add(h);
    const i = new THREE.Mesh( new THREE.BoxGeometry(1,1.4,18), new THREE.MeshPhongMaterial({color: "black"}));
    i.position.set(1.5,8.3,9.2);
    mado.add(i);
    const j = i.clone();
    j.position.set(1.5,-8.3,9.2);
    mado.add(j);
    const k = i.clone();
    k.position.set(0.5,8.3,27.2);
    mado.add(k);
    const l = i.clone();
    l.position.set(0.5,-8.3,27.2);
    mado.add(l);
    const m = new THREE.Mesh( new THREE.BoxGeometry(0.2,15.2,16.5), new THREE.MeshLambertMaterial({color: "skyBlue"}));
    m.position.set(1.5,0,9.5);
    mado.add(m);
    const n = m.clone();
    n.position.set(0.5,0,27.3);
    mado.add(n);
  }
  mado.position.set(21.4,23,-16);
  heya.add(mado);

  //コンセント
  const con = new THREE.Group();
  {
    const a = new THREE.Mesh(new THREE.BoxGeometry(0.2,3.7,2.3), new THREE.MeshPhongMaterial({color: "#fff2ae"}));
    con.add(a);
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.1,2,1.2), new THREE.MeshPhongMaterial({color: "white"}));
    b.position.x = 0.15;
    con.add(b);
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.1,0.3,0.1), new THREE.MeshPhongMaterial({color: "black"}));
    c.position.set(0.2,0.3,0.2);
    con.add(c);
    const d = c.clone();
    d.position.set(0.2,0.3,-0.2);
    con.add(d);
    const e = c.clone();
    e.position.set(0.2,-0.3,0.2);
    con.add(e);
    const f = c.clone();
    f.position.set(0.2,-0.3,-0.2)
    con.add(f);

  }
  con.position.set(-19.9,5,5);
  heya.add(con)

  //時計
  const watch = new THREE.Group();
  {
    const textureLoader = new THREE.TextureLoader();
    const watchgara = textureLoader.load("watch.jpg");
    const watchMaterial = new THREE.MeshPhongMaterial({map: watchgara});
    const a = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 0.6, 24, 1),
    [new THREE.MeshLambertMaterial({color: "black"}),
      new THREE.MeshLambertMaterial({color: "black"}),
      watchMaterial]
    );
    scene.add(a);
  }
//ダンベル
//時計
//服のやつ
//鏡
//ゴミ箱

heya.position.y = -100;
  //光源の作成
  const light1 = new THREE.DirectionalLight(0xffffff, 0.4);
  light1.position.set(0, 28, 0);
  light1.castShadow = true;
  heya.add(light1);
  const light2 = new THREE.AmbientLight(0xffffff, 0.4);
  heya.add(light2);
  const light3 = new THREE.PointLight(0xffffff, 200,  200);
  light3.position.set(0, 28, 0);
  light3.castShadow = true;
  heya.add(light3);
  const light4 = new THREE.SpotLight(0xffffff, 1);
  light4.position.set(-20, 22, 22);
  light4.castShadow = true;
  heya.add(light4);

  //影の設定
  heya.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });

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