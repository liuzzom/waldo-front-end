import {Model} from "./Model";
import {PointersService} from "../services/pointers.service";

export interface Provider {
  // properties
  id: string;
  name: string
  providerFeatures: string[];
  renderingEngine: string;
  pointerTrigger?: boolean;

  // methods
  renderModel(model: Model): void;

  setPointerService?(pointersService: PointersService): void;
}
