import {Model} from "./Model";

export interface Provider {
  // properties
  id: string;
  name: string
  providerFeatures: string[];
  renderingEngine: string;

  // methods
  renderModel(model: Model): void;
}
