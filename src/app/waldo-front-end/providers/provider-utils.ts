import {Provider} from "../domain-model/Provider";
import {HtmlSimpleProvider} from "./2d/view/HtmlSimpleProvider";
import {ThreejsObjViewNavMarkProvider} from "./three-js/obj/mark/ThreejsObjViewNavMarkProvider";
import {ThreejsObjViewProvider} from "./three-js/obj/view/ThreejsObjViewProvider";
import {ThreejsObjViewNavProvider} from "./three-js/obj/nav/ThreejsObjViewNavProvider";
import {HtmlLeafletMarkProvider} from "./2d/mark/HtmlLeafletMarkProvider";
import {AFrameObjViewProvider} from "./a-frame/obj/view/AFrameObjViewProvider";
import {AFrameObjViewNavProvider} from "./a-frame/obj/nav/AFrameObjViewNavProvider";
import {AFrameObjViewNavMarkProvider} from "./a-frame/obj/mark/AFrameObjViewNavMarkProvider";
import {ThreejsGltfViewProvider} from "./three-js/gltf/view/ThreejsGltfViewProvider";
import {ThreejsGltfViewNavMarkProvider} from "./three-js/gltf/mark/ThreejsGltfViewNavMarkProvider";
import {ThreejsGltfViewNavProvider} from "./three-js/gltf/nav/ThreejsGltfViewNavProvider";
import {AFrameGltfViewProvider} from "./a-frame/gltf/view/AFrameGltfViewProvider";
import {AFrameGltfViewNavProvider} from "./a-frame/gltf/nav/AFrameGltfViewNavProvider";
import {AFrameGltfViewNavMarkProvider} from "./a-frame/gltf/mark/AFrameGltfViewNavMarkProvider";
import {Model} from "../domain-model/Model";

export class ProviderUtils {
  // -------------------- Constructor --------------------
  constructor() {
  }

  // -------------------- Methods --------------------
  static createProvider(providerInfo: Provider, model: Model): Provider{
    const renderingEngine = providerInfo.renderingEngine;
    const features = providerInfo.providerFeatures;
    const format = model.sources[0].split('.')[model.sources[0].split('.').length - 1];

    switch (renderingEngine) {
      case "html-img":
        return new HtmlSimpleProvider(providerInfo);
      case "html-canvas-leaflet":
        return new HtmlLeafletMarkProvider(providerInfo);
      case "three.js":
        if(format === 'obj'){
          if(features.includes('mark')) return new ThreejsObjViewNavMarkProvider(providerInfo);
          if(features.includes('nav')) return new ThreejsObjViewNavProvider(providerInfo);
          return new ThreejsObjViewProvider(providerInfo);
        }
        if(format === 'gltf'){
          if(features.includes('mark')) return new ThreejsGltfViewNavMarkProvider(providerInfo);
          if(features.includes('nav')) return new ThreejsGltfViewNavProvider(providerInfo);
          return new ThreejsGltfViewProvider(providerInfo);
        }
        return null;
      case "a-frame":
        if(format === 'obj'){
          if(features.includes('mark')) return new AFrameObjViewNavMarkProvider(providerInfo);
          if(features.includes('nav')) return new AFrameObjViewNavProvider(providerInfo);
          return new AFrameObjViewProvider(providerInfo);
        }
        if(format === 'gltf'){
          if(features.includes('mark')) return new AFrameGltfViewNavMarkProvider(providerInfo);
          if(features.includes('nav')) return new AFrameGltfViewNavProvider(providerInfo);
          return new AFrameGltfViewProvider(providerInfo);
        }
        return null;
      default:
        console.error("No Provider Found with these specs!");
        return null;
    }
  }
}
