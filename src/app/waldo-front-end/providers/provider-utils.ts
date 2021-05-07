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
  private static supportedFormats = [
    "obj",
    "gltf",
    "png"
  ]

  private static supportedProviders = {
    "obj": {
      default: "31435989-d23e-401a-b1a7-44b4ae9889fb",
      supported: [
        "8d93f4c5-c214-453e-b876-d1d6463ca1f8",
        "55800a26-fdc3-47d4-9c8e-b3d609646e1f",
        "31435989-d23e-401a-b1a7-44b4ae9889fb",
      ]
    },
    "gltf": {
      default: "7a65b86b-2a88-4964-8c6f-2519f90e479b",
      supported: [
        "0fc10eae-66f5-49e4-a593-9b38af78da0c",
        "72405b54-4d1f-4758-aa41-43009719aed8",
        "7a65b86b-2a88-4964-8c6f-2519f90e479b",
        "87298a88-5b64-4ec6-a69e-a01297b7a764",
        "ac1cd20e-4ce2-4fd5-ad47-dd367566809b",
        "a23a47fd-0f6d-4b80-9a0f-89f27104e5fb",
      ]
    },
    "png": {
      default: "b14bffff-ad8d-4fec-99fe-8e753bad0dff",
      supported: [
        "da484bd9-25d9-43cc-a74d-115b2bf3337d"
      ]
    }
  }

  // -------------------- Constructor --------------------
  constructor() {
  }

  // -------------------- Methods --------------------
  static getProvidersByFormat(format: string): any{
    if (!this.supportedFormats.includes(format)) {
      console.error("Model source format is not supported");
      return undefined;
    }

    return this.supportedProviders[format];
  }
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
        console.error("No Provider Found with this id!");
        return null;
    }
  }
}
