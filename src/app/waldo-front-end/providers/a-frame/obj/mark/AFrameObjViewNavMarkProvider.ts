import {Provider} from "../../../../domain-model/Provider";
import {Model} from "../../../../domain-model/Model";
import {PointersService} from "../../../../services/pointers.service";
import * as THREE from "three";
import * as AFRAME from 'aframe';
import {AFrameUtils} from "../../AFrameUtils";

export class AFrameObjViewNavMarkProvider implements Provider {
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
  setPointerService(pointersService: PointersService) {
    this.pointersService = pointersService;
  }

  // ----- Visual Methods ----- \\
  renderModel(model: Model) {
    AFrameUtils.registerPositionSetter();

    let renderingArea = document.getElementById('rendering-area');
    renderingArea.innerHTML = `
      <a-scene embedded id="scene" cursor="rayOrigin: mouse" raycaster="objects: .clickable">
        <!-- Assets definition -->
        <a-assets>
            <a-asset-item id="object-ref" src="${model.sources[0]}"></a-asset-item>
            <a-asset-item id="material-ref" src="${model.sources[1]}"></a-asset-item>
        </a-assets>

        <!-- Using the asset management system. -->
        <a-obj-model id="model" class="clickable" src="#object-ref" mtl="#material-ref" position-setter>
        </a-obj-model>

        <!-- Camera -->
        <a-camera wasd-controls="fly:true" position="0 0 0"></a-camera>

        <!-- Environment elements-->
        <a-sky id="sky" color="#000000"></a-sky>
      </a-scene>
    `;
  }
}
