import {Provider} from "../../../../domain-model/Provider";
import {Model} from "../../../../domain-model/Model";
import * as THREE from "three";
import {ThreejsUtils} from "../../ThreejsUtils";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {THREEx} from './threex.domevents.js';
import {PointersService} from "../../../../services/pointers.service";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {v4 as uuidv4} from 'uuid';
import {Pointer} from "../../../../domain-model/Pointer";

export class ThreejsObjViewNavMarkProvider implements Provider{
  id: string;
  name: string;
  providerFeatures: string[];
  renderingEngine: string;

  // will be use to set the pointer radius
  minBoxSize: number = null;

  // state variable used to add into the map
  public pointerTrigger: boolean = false;
  public selectedPointerId: string = null;
  private pointersService: PointersService;

  // ----- Constructor ----- \\
  constructor(info: Provider) {
    this.id = info.id;
    this.name = info.name;
    this.providerFeatures = info.providerFeatures;
    this.renderingEngine = info.renderingEngine;
  }

  // ----- Method ----- \\
  public setPointerService(service: PointersService){
    this.pointersService = service;
  }

  public setPointerTrigger(value: boolean) {
    this.pointerTrigger = value;
  }

  // ----- Handlers ----- \\
  private onModelClick(event, model: Model, scene: THREE.Scene): void {
    let point = event.intersect.point;

    if (this.pointerTrigger) {
      // Prepare data for new Pointer
      const id: string = uuidv4();
      const position: number[] = [
        point.x,
        point.y,
        point.z
      ];
      const message: string = "";
      const uploaded: string = new Date().toJSON();
      const lastModified: string = uploaded;
      const modelId: string = model.id;

      // create an object that is compliant with the Pointer interface
      let newPointer: Pointer = {
        id: id,
        position: position,
        message: message,
        uploaded: uploaded,
        lastModified: lastModified,
        modelId: modelId
      }

      // save pointer into the back-end
      this.pointersService.loadPointer(newPointer).subscribe((pointer) => {
        this.showPointer(pointer, scene);
      });
    }
  }

  // ----- Visual Methods ----- \\
  showPointer(pointer: Pointer, scene: THREE.Scene) {
    console.log(scene.children);

    // FIX: hard-coded division value
    const geometry = new THREE.SphereGeometry(this.minBoxSize/25, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xcc0000 });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.x = pointer.position[0];
    circle.position.y = pointer.position[1];
    circle.position.z = pointer.position[2];

    scene.add(circle);
    console.log(scene.children);
  }

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
    const mtlPath = model.sources[1];

    let container = document.querySelector("#rendering-area");
    let canvas = this.createChildCanvas("#rendering-area");
    const renderer = new THREE.WebGLRenderer({canvas});

    const camera = ThreejsUtils.setCamera();

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    let scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    ThreejsUtils.setHemisphereLight(scene);
    ThreejsUtils.setDirectionalLight(scene);

    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, (mtl) => {
      mtl.preload();

      const materialsValue = Object.keys(mtl.materials).map(key => mtl.materials[key])
      for (let material of materialsValue) {
        material.side = THREE.DoubleSide;
      }

      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load(objPath, (root) => {
        scene.add(root);

        // compute the box that contains all the stuff
        // from root and below
        const box = new THREE.Box3().setFromObject(root);

        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxSizes = box.getSize(new THREE.Vector3());
        const boxCenter = box.getCenter(new THREE.Vector3());
        this.minBoxSize = Math.min(boxSizes.x, boxSizes.y, boxSizes.z);

        // set the camera to frame the box
        ThreejsUtils.frameArea(boxSize * 1.2, boxSize, boxCenter, camera);
      });
    });

    // Click Handler
    let domEvents = new THREEx.DomEvents(camera, renderer.domElement);

    // It seems that mouseup and mousedown events are not detected
    domEvents.addEventListener(scene, 'click', (event) => {
      this.onModelClick(event, model, scene);
    });

    // get pointers from back-end and render them
    this.pointersService.getPointersByModelId(model.id).subscribe(pointers => {
      console.log(pointers.length);
      for(let pointer of pointers){
        this.showPointer(pointer, scene); // TODO: vedere perché sono nella scena ma non vengono renderizzate
      }
    });

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
