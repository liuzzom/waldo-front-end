import {Provider} from "../../../domain-model/Provider";
import {Model} from "../../../domain-model/Model";

import * as THREE from 'three';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class ThreejsViewProvider implements Provider {
  id: string;
  name: string
  providerFeatures: string[];
  renderingEngine: string;

  constructor() {}

  private createChildCanvas(selector: string){
    let container = document.querySelector(selector);

    if(!container){
      console.error("Can't get the container");
      return null;
    }

    let canvas = <HTMLCanvasElement> document.createElement("CANVAS");
    canvas.id = "rendering-canvas";
    container.appendChild(canvas);
    return canvas;
  }


  renderModel(model: Model) {
    const objPath = 'http://localhost:4200/assets/models/Windmill/windmill.obj';
    const mtlPath = 'http://localhost:4200/assets/models/Windmill/windmill-fixed.mtl';

    let container = document.querySelector("#rendering-area");
    let canvas = this.createChildCanvas("#rendering-area");
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    {
      const skyColor = 0xB1E1FF;  // light blue
      const groundColor = 0xB97A20;  // brownish orange
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(5, 10, 2);
      scene.add(light);
      scene.add(light.target);
    }

    {
      const mtlLoader = new MTLLoader();
      mtlLoader.load(mtlPath, (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        mtl.materials.Material.side = THREE.DoubleSide;
        objLoader.setMaterials(mtl);
        objLoader.load(objPath, (root) => {
          scene.add(root);
        });
      });
    }

    function render() {
      const canvas = renderer.domElement;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }
}
