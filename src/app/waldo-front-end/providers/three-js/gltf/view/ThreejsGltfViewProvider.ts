import {Provider} from "../../../../domain-model/Provider";
import {Model} from "../../../../domain-model/Model";

export class ThreejsGltfViewProvider implements Provider{
  id: string;
  name: string;
  providerFeatures: string[];
  renderingEngine: string;

  constructor(info: Provider) {
    this.id = info.id;
    this.name = info.name;
    this.providerFeatures = info.providerFeatures;
    this.renderingEngine = info.renderingEngine;
  }

  renderModel(model: Model) {
    alert('renderModel will be implemented soon...');
  }
}
