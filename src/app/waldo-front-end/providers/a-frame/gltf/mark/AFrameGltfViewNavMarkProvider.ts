import {Provider} from "../../../../domain-model/Provider";
import {Model} from "../../../../domain-model/Model";
import {PointersService} from "../../../../services/pointers.service";
import * as THREE from "three";
import * as AFRAME from 'aframe';
import {AFrameUtils} from "../../AFrameUtils";
import {Pointer} from "../../../../domain-model/Pointer";
import {v4 as uuidv4} from 'uuid';

export class AFrameGltfViewNavMarkProvider implements Provider{
  id: string;
  name: string;
  providerFeatures: string[];
  renderingEngine: string;

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
  public setPointerService(pointersService: PointersService) {
    this.pointersService = pointersService;
  }

  public setPointerTrigger(value: boolean) {
    this.pointerTrigger = value;
  }

  // ----- Handlers ----- \\

  // click Handler
  clickHandler(event, model: Model){
    let point = event.detail.intersection.point
    let pointString = point.x.toFixed(3) + " " + point.y.toFixed(3) + " " + point.z.toFixed(3);

    if (!this.pointerTrigger) return;

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
      this.showPointer(pointer);
    });
  }

  showPointer(pointer: Pointer){
    // create a string containing the position
    let pointString = pointer.position[0].toFixed(3) + " "
      + pointer.position[1].toFixed(3) + " "
      + pointer.position[2].toFixed(3);

    // compute the box that contains the model
    let modelRef = <any>document.getElementById("model");
    const box = new THREE.Box3().setFromObject(modelRef.object3D);
    const boxSizes = box.getSize(new THREE.Vector3());

    // compute the min size of the box (x, y, z)
    // it will be used to set pointer radius
    let minBoxSize = Math.min(boxSizes.x, boxSizes.y, boxSizes.z);
    let radius = minBoxSize / 30;

    let scene = document.getElementById("scene");
    let marker = document.createElement("a-sphere");
    scene.appendChild(marker);

    marker.setAttribute("class", "pointer");
    marker.setAttribute("radius", `${radius}`);
    marker.setAttribute("color", "#CC0000");
    marker.setAttribute("position", pointString);
  }

  // ----- Visual Methods ----- \\
  renderModel(model: Model) {
    // This component sets the position of the model according to its size
    AFrameUtils.registerPositionSetter();

    // reference to the provider itself
    let caller: any = this;

    function clickHandler(event) {
      caller.clickHandler(event, model);
    }

    // sets the behaviour in response to a click event
    AFRAME.registerComponent('click-handler', {
      // init also calls update
      init: function () {
        let mouseDownTime: number = null;
        let mouseDownPoint: any = null;

        this.el.addEventListener('mousedown', event => {
          mouseDownTime = new Date().getTime();
          mouseDownPoint = event.detail.intersection.point;
        });

        this.el.addEventListener('mouseup', event => {
          if(!event.detail.intersection) return;

          let mouseUpTime = new Date().getTime();
          let mouseUpPoint = event.detail.intersection.point;

          // compute the differences (time and position) between press and release
          let timeDiff = mouseUpTime - mouseDownTime;

          // if press and release occur within 185 ms
          //  we consider the event as a click
          if (timeDiff <= 185 && JSON.stringify(mouseDownPoint) === JSON.stringify(mouseUpPoint)) {
            clickHandler(event);
          }
        });
      }
    });


    let renderingArea = document.getElementById('rendering-area');
    renderingArea.innerHTML = `
      <a-scene embedded id="scene" cursor="rayOrigin: mouse" raycaster="objects: .clickable">
        <!-- Assets definition -->
        <a-assets>
            <a-asset-item id="object-ref" src="${model.sources[0]}"></a-asset-item>
        </a-assets>

        <!-- Using the asset management system. -->
        <a-gltf-model id="model" class="clickable" src="#object-ref" position-setter click-handler></a-gltf-model>

        <!-- Camera -->
        <a-camera id="camera" wasd-controls="fly:true"></a-camera>

        <!-- Environment elements-->
        <a-sky id="sky" color="#000000"></a-sky>
      </a-scene>
    `;

    setTimeout(() => {
      this.pointersService.getPointersByModelId(model.id).subscribe(pointers => {
        for(let pointer of pointers){
          this.showPointer(pointer);
        }
      });
    }, 400);
  }
}
