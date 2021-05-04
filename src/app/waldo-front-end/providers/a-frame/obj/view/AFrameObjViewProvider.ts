import {Provider} from "../../../../domain-model/Provider";
import {Model} from "../../../../domain-model/Model";
import * as THREE from 'three';
import * as AFRAME from 'aframe';
import {AFrameUtils} from "../../AFrameUtils";

export class AFrameObjViewProvider implements Provider {
  id: string;
  name: string
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
        <a-obj-model id="model" class="clickable" src="#object-ref" mtl="#material-ref" position-setter></a-obj-model>

        <!-- Camera -->
        <a-camera id="camera" look-controls="enabled: false" wasd-controls-enabled="false"></a-camera>

        <!-- Environment elements-->
        <a-sky id="sky" color="#000000"></a-sky>
      </a-scene>
    `;
  }
}
