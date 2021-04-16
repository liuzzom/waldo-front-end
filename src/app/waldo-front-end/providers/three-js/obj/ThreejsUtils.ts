import * as THREE from "three";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {THREEx} from "./mark/threex.domevents";

export class ThreejsUtils {
  private static minBoxSize: number = null;

  private static setMinBoxSize(value: number){
    ThreejsUtils.minBoxSize = value;
  }

  static setCamera(): THREE.PerspectiveCamera {
    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    return camera;
  }

  static setHemisphereLight(scene: THREE.Scene) {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  static setDirectionalLight(scene: THREE.Scene) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }

  static frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
      .subVectors(camera.position, boxCenter)
      .multiply(new THREE.Vector3(1, 0, 1))
      .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  static loadMtlAndObj(scene: THREE.Scene, camera: THREE.PerspectiveCamera, mtlPath: string, objPath: string): void {
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
        ThreejsUtils.setMinBoxSize(Math.min(boxSizes.x, boxSizes.y, boxSizes.z));

        // set the camera to frame the box
        ThreejsUtils.frameArea(boxSize * 1.2, boxSize, boxCenter, camera);
      });
    });
  }
}
