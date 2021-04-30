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
      supported: ["da484bd9-25d9-43cc-a74d-115b2bf3337d"]
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

  static createProvider(providerInfo: Provider): Provider{
    switch (providerInfo.id){
      case "da484bd9-25d9-43cc-a74d-115b2bf3337d":
        return new HtmlSimpleProvider(providerInfo);
      case "b14bffff-ad8d-4fec-99fe-8e753bad0dff":
        return new HtmlLeafletMarkProvider(providerInfo);
      case "8d93f4c5-c214-453e-b876-d1d6463ca1f8":
        return new ThreejsObjViewProvider(providerInfo);
      case "55800a26-fdc3-47d4-9c8e-b3d609646e1f":
        return new ThreejsObjViewNavProvider(providerInfo);
      case "31435989-d23e-401a-b1a7-44b4ae9889fb":
        return new ThreejsObjViewNavMarkProvider(providerInfo);
      case "f6bc3993-456a-4cf3-900b-69e6c8ff888b":
        return new AFrameObjViewProvider(providerInfo);
      case "34f51504-8326-421c-b0f1-383ebe88fa93":
        return new AFrameObjViewNavProvider(providerInfo);
      case "29b8afd0-43ab-42ba-bc8b-c184624f2e49":
        return new AFrameObjViewNavMarkProvider(providerInfo);
      case "0fc10eae-66f5-49e4-a593-9b38af78da0c":
        return new ThreejsGltfViewProvider(providerInfo);
      case "72405b54-4d1f-4758-aa41-43009719aed8":
        return new ThreejsGltfViewNavProvider(providerInfo);
      case "7a65b86b-2a88-4964-8c6f-2519f90e479b":
        return new ThreejsGltfViewNavMarkProvider(providerInfo);
      case "87298a88-5b64-4ec6-a69e-a01297b7a764":
        return new AFrameGltfViewProvider(providerInfo);
      case "ac1cd20e-4ce2-4fd5-ad47-dd367566809b":
        return new AFrameGltfViewNavProvider(providerInfo);
      case "a23a47fd-0f6d-4b80-9a0f-89f27104e5fb":
        return new AFrameGltfViewNavMarkProvider(providerInfo);
      default:
        console.error("No Provider Found with this id!");
        return null;
    }
  }
}
