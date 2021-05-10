import {Provider} from "../../../../domain-model/Provider";
import {Model} from "../../../../domain-model/Model";
import {AFrameUtils} from "../../AFrameUtils";
import * as AFRAME from 'aframe';

export class AFrameGltfViewNavProvider implements Provider{
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
  renderModel(model: Model) {
    // Delete AFrame components to avoid runtime error
    delete AFRAME.components['position-setter'];

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
        <a-camera id="camera" wasd-controls="fly:true"></a-camera>

        <!-- Environment elements-->
        <a-sky id="sky" color="#000000"></a-sky>
      </a-scene>
    `;
  }
}
