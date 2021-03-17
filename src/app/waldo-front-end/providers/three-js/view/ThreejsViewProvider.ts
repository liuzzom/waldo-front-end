import {Provider} from "../../../domain-model/Provider";
import {Model} from "../../../domain-model/Model";

export class ThreejsViewProvider implements Provider {
  id: string;
  name: string
  providerFeatures: string[];
  renderingEngine: string;

  renderModel(model: Model) {
    console.log('called renderModel from ThreejsViewProvider');
    console.log(`id: ${model.id}`);
    console.log(`name: ${model.name}`)
  }
}
