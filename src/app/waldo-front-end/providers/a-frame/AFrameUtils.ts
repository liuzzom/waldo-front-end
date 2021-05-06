import * as AFRAME from 'aframe';
import * as THREE from "three";

export class AFrameUtils{
  static registerPositionSetter(){
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

          let camera = document.getElementById("camera");

          // compute camera position according to model size
          let x = 0;
          let y = 0.3 * maxBoxSize;
          let z = 1.2 * maxBoxSize;
          let positionString = `${x} ${y} ${z}`;

          camera.setAttribute("position", positionString);
        });
      }
    });
  }
}
