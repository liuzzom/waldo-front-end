import {Provider} from "../../../domain-model/Provider";
import {Model} from "../../../domain-model/Model";

export class AFrameViewProvider implements Provider {
  id: string;
  name: string
  providerFeatures: string[];
  renderingEngine: string;

  renderModel(model: Model) {

    let renderingArea = document.getElementById('rendering-area');
    renderingArea.innerHTML = `
      <a-scene embedded id="scene" cursor="rayOrigin: mouse" raycaster="objects: .clickable">
        <!-- Assets definition -->
        <a-assets>
            <a-asset-item id="object-ref" src="assets/models/Windmill/windmill.obj"></a-asset-item>
            <a-asset-item id="material-ref" src="assets/models/Windmill/windmill-fixed.mtl"></a-asset-item>
        </a-assets>

        <!-- Using the asset management system. -->
        <a-obj-model id="model" class="clickable" src="#object-ref" mtl="#material-ref" position="0 0 -14" rotation="0 -60 0">
        </a-obj-model>

        <!-- Camera -->
        <a-camera look-controls="enabled: false" wasd-controls-enabled="false" position="0 3.5 0 "></a-camera>

        <!-- Environment elements-->
        <a-sky id="sky" color="#000000"></a-sky>
      </a-scene>
    `;
  }
}
