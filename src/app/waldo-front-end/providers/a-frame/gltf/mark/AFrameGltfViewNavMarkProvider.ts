import {Provider} from "../../../../domain-model/Provider";
import {Model} from "../../../../domain-model/Model";
import {AFrameUtils} from "../../AFrameUtils";
import {PointersService} from "../../../../services/pointers.service";

export class AFrameGltfViewNavMarkProvider implements Provider{
  id: string;
  name: string;
  providerFeatures: string[];
  renderingEngine: string;

  pointersService: PointersService;

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

  // ----- Visual Methods ----- \\
  renderModel(model: Model) {
    AFrameUtils.registerPositionSetter();

    let renderingArea = document.getElementById('rendering-area');
    renderingArea.innerHTML = `
      <a-scene embedded id="scene" cursor="rayOrigin: mouse" raycaster="objects: .clickable">
        <!-- Assets definition -->
        <a-assets>
            <a-asset-item id="object-ref" src="${model.sources[0]}"></a-asset-item>
        </a-assets>

        <!-- Using the asset management system. -->
        <a-gltf-model id="model" class="clickable" src="#object-ref" click-handler position-setter></a-gltf-model>

        <!-- Camera -->
        <a-camera wasd-controls="fly:true" position="0 0 0"></a-camera>

        <!-- Environment elements-->
        <a-sky id="sky" color="#000000"></a-sky>
      </a-scene>
    `;
  }
}
