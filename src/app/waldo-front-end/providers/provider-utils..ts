export class ProviderUtils {
  private static supportedFormats = [
    "obj",
    "gltf"
  ]

  private static supportedProviders = {
    "obj": {
      default: "31435989-d23e-401a-b1a7-44b4ae9889fb",
      supported: [
        "b4c31c82-b345-4c7d-bccc-22b6170153af",
        "8d93f4c5-c214-453e-b876-d1d6463ca1f8",
        "55800a26-fdc3-47d4-9c8e-b3d609646e1f",
        "31435989-d23e-401a-b1a7-44b4ae9889fb",
      ]
    },
    "gltf": {
      default: "31435989-d23e-401a-b1a7-44b4ae9889fb",
      supported: [
        "b4c31c82-b345-4c7d-bccc-22b6170153af",
        "8d93f4c5-c214-453e-b876-d1d6463ca1f8",
        "55800a26-fdc3-47d4-9c8e-b3d609646e1f",
        "31435989-d23e-401a-b1a7-44b4ae9889fb",
        "f6bc3993-456a-4cf3-900b-69e6c8ff888b",
        "34f51504-8326-421c-b0f1-383ebe88fa93",
        "29b8afd0-43ab-42ba-bc8b-c184624f2e49"
      ]
    }
  }

  // -------------------- Constructor --------------------
  constructor() {
  }

  // -------------------- Methods --------------------
  static getProvidersByFormat(format: string){
    if (!this.supportedFormats.includes(format)) {
      console.error("Model source format is not supported");
      return undefined;
    }

    return this.supportedProviders[format];
  }
}
