import {Provider} from "../../../../domain-model/Provider";
import {Model} from "../../../../domain-model/Model";
import * as THREE from "three";
import {ThreejsUtils} from "../../ThreejsUtils";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export class ThreejsGltfViewNavProvider implements Provider{
  id: string;
  name: string;
  providerFeatures: string[];
  renderingEngine: string;

  // ----- Constructor ----- \\
  constructor(info: Provider) {
    this.id = info.id;
    this.name = info.name;
    this.providerFeatures = info.providerFeatures;
    this.renderingEngine = info.renderingEngine;
  }

  // ----- Visual Methods ----- \\
  private createChildCanvas(selector: string) {
    let container = document.querySelector(selector);

    if (!container) {
      console.error("Can't get the container");
      return null;
    }

    let canvas = <HTMLCanvasElement>document.createElement("CANVAS");
    canvas.id = "rendering-canvas";
    container.appendChild(canvas);
    return canvas;
  }

  renderModel(model: Model) {
    const objPath = model.sources[0];

    let container = document.querySelector("#rendering-area");
    let canvas = this.createChildCanvas("#rendering-area");
    const renderer = new THREE.WebGLRenderer({canvas});

    const camera = ThreejsUtils.setCamera();

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    ThreejsUtils.setHemisphereLight(scene);
    ThreejsUtils.setDirectionalLight(scene);

    ThreejsUtils.loadGltfWithControls(scene, camera, controls, objPath);

    function render() {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      camera.aspect = canvas.width / canvas.height;
      camera.updateProjectionMatrix();

      renderer.setSize(canvas.width, canvas.height);

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }
}
