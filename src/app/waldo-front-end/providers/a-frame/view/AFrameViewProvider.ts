import {Provider} from "../../../domain-model/Provider";
import {Model} from "../../../domain-model/Model";
import * as THREE from 'three';
import * as AFRAME from 'aframe';

export class AFrameViewProvider implements Provider {
  id: string;
  name: string
  providerFeatures: string[];
  renderingEngine: string;

  renderModel(model: Model) {
    AFRAME.registerComponent('position-setter', {
      init: function () {
        this.el.addEventListener('model-loaded', () => {
          // compute the box that contains the model
          const modelAsAny = <any> document.getElementById("model");
          const box = new THREE.Box3().setFromObject(modelAsAny.object3D);
          const boxSizes = box.getSize(new THREE.Vector3());

          // compute the max size of the box (x, y, z)
          // it will be used to set model position
          const maxBoxSize = Math.max(boxSizes.x, boxSizes.y, boxSizes.z);

          let model = document.getElementById("model");
          model.setAttribute("position", "0 0 -" + 1.2 * maxBoxSize);
        })
      }
    });

    let renderingArea = document.getElementById('rendering-area');
    renderingArea.innerHTML = `
      <a-scene embedded id="scene" cursor="rayOrigin: mouse" raycaster="objects: .clickable">
        <!-- Assets definition -->
        <a-assets>
            <a-asset-item id="object-ref" src="assets/models/Windmill/windmill.obj"></a-asset-item>
            <a-asset-item id="material-ref" src="assets/models/Windmill/windmill-fixed.mtl"></a-asset-item>
        </a-assets>

        <!-- Using the asset management system. -->
        <a-obj-model id="model" class="clickable" src="#object-ref" mtl="#material-ref" position-setter>
        </a-obj-model>

        <!-- Camera -->
        <a-camera look-controls="enabled: false" wasd-controls-enabled="false" position="0 0 0"></a-camera>

        <!-- Environment elements-->
        <a-sky id="sky" color="#000000"></a-sky>
      </a-scene>
    `;
  }
}
