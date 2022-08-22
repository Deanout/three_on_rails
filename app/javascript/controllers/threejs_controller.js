import { Controller } from "@hotwired/stimulus";
import * as THREE from "three";
import { OrbitControls } from "three/examples";

// Connects to data-controller="threejs"
export default class extends Controller {
  connect() {
    console.log("Hello, Stimulus!", this.element);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const red = 0xff0000;
    const green = 0x00ff00;
    const blue = 0x0000ff;
    const grey = 0x777777;

    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshStandardMaterial({
      color: green,
      wireframe: false,
    });

    this.originCube = this.createCube(0, 0, 0);
    this.offsetCube = this.createCube(5, 5, -5);

    this.pointLight = new THREE.PointLight(0xffffff);
    this.pointLight.position.set(8, 4, -5);

    this.lightHelper = new THREE.PointLightHelper(this.pointLight);
    this.gridHelper = new THREE.GridHelper(100, 100);

    this.scene.add(
      this.lightHelper,
      this.gridHelper,
      this.originCube,
      this.offsetCube,
      this.pointLight
    );

    const backgroundTexture = new THREE.TextureLoader().load(
      "/assets/space.jpg"
    );
    this.scene.background = backgroundTexture;

    this.camera.position.z = 5;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.originCube.rotation.x += 0.01;
    this.originCube.rotation.y += 0.01;

    this.offsetCube.rotation.x -= 0.003;
    this.offsetCube.rotation.y -= 0.002;

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }

  createCube(x, y, z) {
    const cube = new THREE.Mesh(this.geometry, this.material);
    cube.position.set(x, y, z);

    return cube;
  }
}
